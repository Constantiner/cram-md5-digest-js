function* sequenceGenerator(startValue, condition, changeValueRule) {
	let value = startValue;
	while (condition(value)) {
		yield value;
		value = changeValueRule(value);
	}
}
export function cramMd5Digest(passwordString, cramKey) {
	const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))),
		range = (from, to) => [...sequenceGenerator(from, value => value <= to, value => value + 1)],
		T = range(0, 63).map(i => (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0),
		init = (initObj = {}) =>
			Object.assign({}, initObj, {
				byteCount: 0,
				state0: 0x67452301,
				state1: 0xefcdab89,
				state2: 0x98badcfe,
				state3: 0x10325476
			}),
		initialInit = () =>
			init({
				padding: Array.from({
					length: 64
				}).map((x, index) => (index === 0 ? 0x80 : 0)),
				block: Array.from({
					length: 64
				})
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
			[...stringToEncode]
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
		FF = (a, b, c, d, x, s, ac) => toUnsigned(lShift(a + F(b, c, d) + x + ac, s) + b),
		GG = (a, b, c, d, x, s, ac) => toUnsigned(lShift(a + G(b, c, d) + x + ac, s) + b),
		HH = (a, b, c, d, x, s, ac) => toUnsigned(lShift(a + H(b, c, d) + x + ac, s) + b),
		II = (a, b, c, d, x, s, ac) => toUnsigned(lShift(a + I(b, c, d) + x + ac, s) + b),
		//
		// MD5 basic transformation. Transforms state based on block.
		//
		transformBlock = stateObj => {
			let a = stateObj.state0,
				b = stateObj.state1,
				c = stateObj.state2,
				d = stateObj.state3;
			const x = Array(16)
				.fill()
				.map(
					(_, j) =>
						((stateObj.block[j * 4 + 3] * 256 + stateObj.block[j * 4 + 2]) * 256 + stateObj.block[j * 4 + 1]) * 256 +
						stateObj.block[j * 4]
				);

			// Round 1
			a = FF(a, b, c, d, x[0], 7, T[0]); // 1
			d = FF(d, a, b, c, x[1], 12, T[1]); // 2
			c = FF(c, d, a, b, x[2], 17, T[2]); // 3
			b = FF(b, c, d, a, x[3], 22, T[3]); // 4
			a = FF(a, b, c, d, x[4], 7, T[4]); // 5
			d = FF(d, a, b, c, x[5], 12, T[5]); // 6
			c = FF(c, d, a, b, x[6], 17, T[6]); // 7
			b = FF(b, c, d, a, x[7], 22, T[7]); // 8
			a = FF(a, b, c, d, x[8], 7, T[8]); // 9
			d = FF(d, a, b, c, x[9], 12, T[9]); // 10
			c = FF(c, d, a, b, x[10], 17, T[10]); // 11
			b = FF(b, c, d, a, x[11], 22, T[11]); // 12
			a = FF(a, b, c, d, x[12], 7, T[12]); // 13
			d = FF(d, a, b, c, x[13], 12, T[13]); // 14
			c = FF(c, d, a, b, x[14], 17, T[14]); // 15
			b = FF(b, c, d, a, x[15], 22, T[15]); // 16

			// Round 2
			a = GG(a, b, c, d, x[1], 5, T[16]); // 17
			d = GG(d, a, b, c, x[6], 9, T[17]); // 18
			c = GG(c, d, a, b, x[11], 14, T[18]); // 19
			b = GG(b, c, d, a, x[0], 20, T[19]); // 20
			a = GG(a, b, c, d, x[5], 5, T[20]); // 21
			d = GG(d, a, b, c, x[10], 9, T[21]); // 22
			c = GG(c, d, a, b, x[15], 14, T[22]); // 23
			b = GG(b, c, d, a, x[4], 20, T[23]); // 24
			a = GG(a, b, c, d, x[9], 5, T[24]); // 25
			d = GG(d, a, b, c, x[14], 9, T[25]); // 26
			c = GG(c, d, a, b, x[3], 14, T[26]); // 27
			b = GG(b, c, d, a, x[8], 20, T[27]); // 28
			a = GG(a, b, c, d, x[13], 5, T[28]); // 29
			d = GG(d, a, b, c, x[2], 9, T[29]); // 30
			c = GG(c, d, a, b, x[7], 14, T[30]); // 31
			b = GG(b, c, d, a, x[12], 20, T[31]); // 32

			// Round 3
			a = HH(a, b, c, d, x[5], 4, T[32]); // 33
			d = HH(d, a, b, c, x[8], 11, T[33]); // 34
			c = HH(c, d, a, b, x[11], 16, T[34]); // 35
			b = HH(b, c, d, a, x[14], 23, T[35]); // 36
			a = HH(a, b, c, d, x[1], 4, T[36]); // 37
			d = HH(d, a, b, c, x[4], 11, T[37]); // 38
			c = HH(c, d, a, b, x[7], 16, T[38]); // 39
			b = HH(b, c, d, a, x[10], 23, T[39]); // 40
			a = HH(a, b, c, d, x[13], 4, T[40]); // 41
			d = HH(d, a, b, c, x[0], 11, T[41]); // 42
			c = HH(c, d, a, b, x[3], 16, T[42]); // 43
			b = HH(b, c, d, a, x[6], 23, T[43]); // 44
			a = HH(a, b, c, d, x[9], 4, T[44]); // 45
			d = HH(d, a, b, c, x[12], 11, T[45]); // 46
			c = HH(c, d, a, b, x[15], 16, T[46]); // 47
			b = HH(b, c, d, a, x[2], 23, T[47]); // 48

			// Round 4
			a = II(a, b, c, d, x[0], 6, T[48]); // 49
			d = II(d, a, b, c, x[7], 10, T[49]); // 50
			c = II(c, d, a, b, x[14], 15, T[50]); // 51
			b = II(b, c, d, a, x[5], 21, T[51]); // 52
			a = II(a, b, c, d, x[12], 6, T[52]); // 53
			d = II(d, a, b, c, x[3], 10, T[53]); // 54
			c = II(c, d, a, b, x[10], 15, T[54]); // 55
			b = II(b, c, d, a, x[1], 21, T[55]); // 56
			a = II(a, b, c, d, x[8], 6, T[56]); // 57
			d = II(d, a, b, c, x[15], 10, T[57]); // 58
			c = II(c, d, a, b, x[6], 15, T[58]); // 59
			b = II(b, c, d, a, x[13], 21, T[59]); // 60
			a = II(a, b, c, d, x[4], 6, T[60]); // 61
			d = II(d, a, b, c, x[11], 10, T[61]); // 62
			c = II(c, d, a, b, x[2], 15, T[62]); // 63
			b = II(b, c, d, a, x[9], 21, T[63]); // 64

			return Object.assign({}, stateObj, {
				state0: toUnsigned(stateObj.state0 + a),
				state1: toUnsigned(stateObj.state1 + b),
				state2: toUnsigned(stateObj.state2 + c),
				state3: toUnsigned(stateObj.state3 + d)
			});
		},
		update = (inputArray, inputLength) => stateObj => {
			stateObj = Object.assign({}, stateObj);
			inputArray.slice(0, inputLength).forEach(item => {
				stateObj.block[stateObj.byteCount % 64] = item;
				if (++stateObj.byteCount % 64 == 0) {
					stateObj = transformBlock(stateObj);
				}
			});
			return stateObj;
		},
		set32Little = (value, index) => array => {
			const result = [...array];
			result[index++] = value & 0xff;
			result[index++] = (value >>> 8) & 0xff;
			result[index++] = (value >>> 16) & 0xff;
			result[index++] = (value >>> 24) & 0xff;
			return result;
		},
		finalDigest = stateObj => {
			const bits = compose(
					set32Little(Math.floor(stateObj.byteCount * 8 / 0x100000000), 4),
					set32Little(stateObj.byteCount * 8, 0)
				)(
					Array.from({
						length: 8
					})
				),
				index = stateObj.byteCount % 64;
			stateObj = compose(update(bits, 8), update(stateObj.padding, index < 56 ? 56 - index : 120 - index))(stateObj);
			return {
				digest: compose(
					set32Little(stateObj.state3, 12),
					set32Little(stateObj.state2, 8),
					set32Little(stateObj.state1, 4),
					set32Little(stateObj.state0, 0)
				)(
					Array.from({
						length: 16
					})
				),
				padding: stateObj.padding,
				block: stateObj.block
			};
		},
		updateArray = (inputArray, stateObj) => update(inputArray, inputArray.length)(stateObj),
		updateString = (stringToEncode, stateObj) => updateArray(toUTFArray(stringToEncode), stateObj),
		hexByte = x => (x < 16 ? "0" : "") + x.toString(16),
		toHexString = byteArray => byteArray.reduce((acc, x) => acc + hexByte(x), "").toLowerCase(),
		finalHexDigest = stateObj => toHexString(finalDigest(stateObj).digest),
		performCram = (passwordString, cramKey, stateObj) => {
			const password = toUTFArray(passwordString);
			let paddedKey;
			if (password.length > 64) {
				const { digest, padding, block } = compose(finalDigest, update(password, password.length))(stateObj);
				stateObj = init({
					padding,
					block
				});
				paddedKey = digest;
			} else {
				paddedKey = password;
			}
			range(paddedKey.length, 63).forEach(index => (paddedKey[index] = 0));
			range(0, 63).forEach(index => (paddedKey[index] ^= 0x36));

			// H(K XOR ipad, text) -> digest
			stateObj = update(paddedKey, paddedKey.length)(stateObj);
			stateObj = updateString(cramKey, stateObj);
			const { digest: theDigest, padding, block } = finalDigest(stateObj);
			stateObj = init({
				padding,
				block
			});

			range(0, 63).forEach(index => (paddedKey[index] ^= 0x36 ^ 0x5c));
			stateObj = update(paddedKey, paddedKey.length)(stateObj);
			stateObj = update(theDigest, theDigest.length)(stateObj);
			return finalHexDigest(stateObj);
		};
	return performCram(passwordString, cramKey, initialInit());
}

export function cramMd5DigestBase64(passwordString, cramKey, padding = false) {
	const resultString = cramMd5Digest(passwordString, cramKey),
		resultArray = resultString.split("").map(char => char.charCodeAt(0)),
		base64Encode = (binary, padding) => {
			const encodeTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
				seq = [...sequenceGenerator(0, value => value + 3 <= binary.length, value => value + 3)],
				postActions = (result, encodeTable, binary, index, padding) => {
					result += encodeTable.substr(binary[index] >>> 2, 1);
					if (index + 1 < binary.length) {
						result +=
							encodeTable.substr(((binary[index] << 4) & 0x30) | (binary[index + 1] >>> 4), 1) +
							encodeTable.substr((binary[index + 1] << 2) & 0x3c, 1);
					} else {
						result += encodeTable.substr((binary[index] << 4) & 0x30, 1);
						if (padding) {
							result += "=";
						}
					}
					if (padding) {
						result += "=";
					}
					return result;
				};
			const result = seq.reduce(
					(result, index) =>
						result +
						encodeTable.substr(binary[index] >>> 2, 1) +
						encodeTable.substr(((binary[index] << 4) & 0x30) | (binary[index + 1] >>> 4), 1) +
						encodeTable.substr(((binary[index + 1] << 2) & 0x3c) | (binary[index + 2] >>> 6), 1) +
						encodeTable.substr(binary[index + 2] & 0x3f, 1),
					""
				),
				index = seq.pop() + 3;
			if (index < binary.length) {
				return postActions(result, encodeTable, binary, index, padding);
			}
			return result;
		};
	return base64Encode(resultArray, padding);
}
