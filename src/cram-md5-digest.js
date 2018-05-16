const range = (from, to) =>
		Array.from(
			{
				length: to - from + 1
			},
			(_, index) => index + from
		),
	range64 = range(0, 63),
	T = range64.map(i => (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0),
	compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))),
	getEmptyArray = length =>
		Array.from({
			length
		}),
	copyState = (source, overridesObj = {}) =>
		Object.assign(
			{},
			source,
			{
				block: [...source.block],
				padding: [...source.padding]
			},
			overridesObj
		),
	init = initObj =>
		copyState(initObj, {
			byteCount: 0,
			state0: 0x67452301,
			state1: 0xefcdab89,
			state2: 0x98badcfe,
			state3: 0x10325476
		}),
	initialInit = () =>
		init({
			padding: getEmptyArray(64).map((_, index) => (index === 0 ? 0x80 : 0)),
			block: getEmptyArray(64)
		}),
	nBitsGenerator = function*(nBits) {
		while (nBits >= 6) {
			nBits = (Math.floor(nBits / 6) - 1) * 6;
			yield nBits;
		}
	},
	utfTextValue = (code, nBits) => 0x80 + ((code >>> nBits) & 0x3f),
	nBitsMatches = [
		[0x00000800, 11],
		[0x00010000, 16],
		[0x00200000, 21],
		[0x04000000, 26],
		[0x80000000, 31],
		[Infinity, 0]
	],
	initialNBits = code => nBitsMatches.find(([hexValue]) => code < hexValue)[1],
	initialUtfTextForCodeMoreThan0x80 = (code, nBits) =>
		((0xfe << (nBits % 6)) & 0xff) | (code >>> (Math.floor(nBits / 6) * 6)),
	utfTextForCodeMoreThan0x80 = code =>
		(nBits => [
			initialUtfTextForCodeMoreThan0x80(code, nBits),
			...[...nBitsGenerator(nBits)].map(nBits => utfTextValue(code, nBits))
		])(initialNBits(code)),
	toUTFArray = stringToEncode =>
		Array.from(stringToEncode)
			.map(x => x.charCodeAt(0))
			.reduce((utfText, code) => [...utfText, ...(code < 0x80 ? [code] : utfTextForCodeMoreThan0x80(code))], []),
	toUnsigned = x => (x + 0x100000000) % 0x100000000,
	lShift = (x, s) => (x << s) | (x >>> (32 - s)),
	// F, G, H and I are basic MD5 functions.
	F = (X, Y, Z) => toUnsigned((X & Y) | (~X & Z)),
	G = (X, Y, Z) => toUnsigned((X & Z) | (Y & ~Z)),
	H = (X, Y, Z) => toUnsigned(X ^ Y ^ Z),
	I = (X, Y, Z) => toUnsigned(Y ^ (X | ~Z)),
	// FF, GG, HH, and II transformations for rounds 1-4.
	XX = func => (xi, s) => ([a, b, c, d, i, x]) => [
		d,
		toUnsigned(lShift(a + func(b, c, d) + x[xi] + T[i], s) + b),
		b,
		c,
		i + 1,
		x
	],
	FF = XX(F),
	GG = XX(G),
	HH = XX(H),
	II = XX(I),
	modifyStates = stateObj => ([a, b, c, d]) =>
		copyState(stateObj, {
			state0: toUnsigned(stateObj.state0 + a),
			state1: toUnsigned(stateObj.state1 + b),
			state2: toUnsigned(stateObj.state2 + c),
			state3: toUnsigned(stateObj.state3 + d)
		}),
	x = stateObj =>
		getEmptyArray(16).map(
			(_, j) =>
				((stateObj.block[j * 4 + 3] * 256 + stateObj.block[j * 4 + 2]) * 256 + stateObj.block[j * 4 + 1]) * 256 +
				stateObj.block[j * 4]
		),
	//
	// MD5 basic transformation. Transforms state based on block.
	//
	transformBlock = stateObj =>
		compose(
			modifyStates(stateObj),
			II(9, 21),
			II(2, 15),
			II(11, 10),
			II(4, 6),
			II(13, 21),
			II(6, 15),
			II(15, 10),
			II(8, 6),
			II(1, 21),
			II(10, 15),
			II(3, 10),
			II(12, 6),
			II(5, 21),
			II(14, 15),
			II(7, 10),
			II(0, 6),
			HH(2, 23),
			HH(15, 16),
			HH(12, 11),
			HH(9, 4),
			HH(6, 23),
			HH(3, 16),
			HH(0, 11),
			HH(13, 4),
			HH(10, 23),
			HH(7, 16),
			HH(4, 11),
			HH(1, 4),
			HH(14, 23),
			HH(11, 16),
			HH(8, 11),
			HH(5, 4),
			GG(12, 20),
			GG(7, 14),
			GG(2, 9),
			GG(13, 5),
			GG(8, 20),
			GG(3, 14),
			GG(14, 9),
			GG(9, 5),
			GG(4, 20),
			GG(15, 14),
			GG(10, 9),
			GG(5, 5),
			GG(0, 20),
			GG(11, 14),
			GG(6, 9),
			GG(1, 5),
			FF(15, 22),
			FF(14, 17),
			FF(13, 12),
			FF(12, 7),
			FF(11, 22),
			FF(10, 17),
			FF(9, 12),
			FF(8, 7),
			FF(7, 22),
			FF(6, 17),
			FF(5, 12),
			FF(4, 7),
			FF(3, 22),
			FF(2, 17),
			FF(1, 12),
			FF(0, 7)
		)([stateObj.state0, stateObj.state1, stateObj.state2, stateObj.state3, 0, x(stateObj)]),
	update = (inputArray, inputLength = inputArray.length) => stateObj =>
		inputArray.slice(0, inputLength).reduce((stateObj, item) => {
			stateObj.block[stateObj.byteCount % 64] = item;
			if (++stateObj.byteCount % 64 === 0) {
				stateObj = transformBlock(stateObj);
			}
			return stateObj;
		}, copyState(stateObj)),
	set32Little = (value, index) => array =>
		range(0, 3).reduce((arr, i) => ((arr[index + i] = (value >>> (i * 8)) & 0xff), arr), [...array]),
	getBits = stateObj =>
		compose(set32Little(Math.floor(stateObj.byteCount * 8 / 0x100000000), 4), set32Little(stateObj.byteCount * 8, 0))(
			getEmptyArray(8)
		),
	alignIndex = index =>
		[[56, ind => 120 - ind], [-Infinity, ind => 56 - ind]].find(range => index >= range[0])[1](index),
	getIndex = stateObj => alignIndex(stateObj.byteCount % 64),
	updateWithIndex = stateObj => update(stateObj.padding, getIndex(stateObj))(stateObj),
	getFinalDigestObj = stateObj => ({
		digest: compose(
			set32Little(stateObj.state3, 12),
			set32Little(stateObj.state2, 8),
			set32Little(stateObj.state1, 4),
			set32Little(stateObj.state0, 0)
		)(getEmptyArray(16)),
		padding: [...stateObj.padding],
		block: [...stateObj.block]
	}),
	finalDigest = stateObj => compose(getFinalDigestObj, update(getBits(stateObj)), updateWithIndex)(stateObj),
	hexByte = x => (x < 16 ? "0" : "") + x.toString(16),
	toHexString = byteArray => byteArray.reduce((acc, x) => acc + hexByte(x), "").toLowerCase(),
	finalHexDigest = stateObj => toHexString(finalDigest(stateObj).digest),
	expandArrayTo64Length = original => [
		...original,
		...Array.from({
			length: 64 - original.length
		}).fill(0)
	],
	updateWithDigest = stateObj => update(stateObj.digest)(stateObj),
	performCram = (password, cramKey, stateObj) => {
		const paddedKey = expandArrayTo64Length(
			password.length > 64
				? ((stateObj = compose(init, finalDigest, update(password))(stateObj)), stateObj.digest)
				: password
		).map(sym => sym ^ 0x36);

		// H(K XOR ipad, text) -> digest
		return compose(
			finalHexDigest,
			updateWithDigest,
			update(paddedKey.map(sym => sym ^ 0x36 ^ 0x5c)),
			init,
			finalDigest,
			update(toUTFArray(cramKey)),
			update(paddedKey)
		)(stateObj);
	},
	/**
	 * Generates MD5 hash from passwordString and cramKey
	 *
	 * @param {string} passwordString Is a password to hash.
	 * @param {string} cramKey Is a key to hash password with.
	 * @returns {string} Is resulting hash.
	 */
	cramMd5Digest = (passwordString, cramKey) => performCram(toUTFArray(passwordString), cramKey, initialInit()),
	encodeTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	getPaddingSymbol = padding => (padding ? "=" : ""),
	postBase64Actions = (base64Sequence, encodeTable, md5Binary, padding) =>
		base64Sequence +
		encodeTable.charAt(md5Binary[30] >>> 2) +
		encodeTable.charAt(((md5Binary[30] << 4) & 0x30) | (md5Binary[30 + 1] >>> 4)) +
		encodeTable.charAt((md5Binary[31] << 2) & 0x3c) +
		getPaddingSymbol(padding),
	base64EncodeIndexGenerator = () =>
		Array.from(
			{
				length: 10
			},
			(_, i) => i * 3
		),
	getBase64Sequence = md5Binary =>
		base64EncodeIndexGenerator().reduce(
			(result, index) =>
				result +
				encodeTable.charAt(md5Binary[index] >>> 2) +
				encodeTable.charAt(((md5Binary[index] << 4) & 0x30) | (md5Binary[index + 1] >>> 4)) +
				encodeTable.charAt(((md5Binary[index + 1] << 2) & 0x3c) | (md5Binary[index + 2] >>> 6)) +
				encodeTable.charAt(md5Binary[index + 2] & 0x3f),
			""
		),
	base64Encode = (md5Binary, padding) =>
		postBase64Actions(getBase64Sequence(md5Binary), encodeTable, md5Binary, padding),
	/**
	 * Generates MD5 hash from passwordString and cramKey and encodes it in Base64.
	 *
	 * @param {string} passwordString Is a password to hash.
	 * @param {string} cramKey Is a key to hash password with.
	 * @param {boolean} [padding=false] If true there is Base64 padding (=) added.
	 * @returns {string} Is resulting hash.
	 */
	cramMd5DigestBase64 = (passwordString, cramKey, padding = false) =>
		base64Encode(Array.from(cramMd5Digest(passwordString, cramKey)).map(char => char.charCodeAt(0)), padding);

export { cramMd5Digest, cramMd5DigestBase64 };
