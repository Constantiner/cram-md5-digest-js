// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Lookup<T, K extends keyof any, Else = never> = K extends keyof T ? T[K] : Else;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Tail<T extends any[]> = ((...t: T) => void) extends (x: any, ...u: infer U) => void ? U : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func1 = (arg: any) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArgType<F, Else = never> = F extends (arg: infer A) => any ? A : Else;
type AsChain<F extends [Func1, ...Func1[]], G extends Func1[] = Tail<F>> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[K in keyof F]: (arg: ArgType<F[K]>) => ArgType<Lookup<G, K, any>, any>;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LastIndexOf<T extends any[]> = ((...x: T) => void) extends (y: any, ...z: infer U) => void ? U["length"] : never;
type Block = [number, number, number, number, number, number[]];
interface State {
	byteCount?: number;
	state0?: number;
	state1?: number;
	state2?: number;
	state3?: number;
	block?: number[];
	padding?: number[];
	digest?: number[];
}

const range = (from: number, to: number): number[] =>
		Array.from(
			{
				length: to - from + 1
			},
			(_, index) => index + from
		),
	range64 = range(0, 63),
	T = range64.map(i => (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0),
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pipe = <F extends [(arg: any) => any, ...Array<(arg: any) => any>]>(
		...fns: F & AsChain<F>
	): // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	((arg: ArgType<F[0]>) => ReturnType<F[LastIndexOf<F>]>) => fns.reduceRight((f, g) => value => f(g(value))),
	getEmptyArray = (length: number): number[] =>
		Array.from({
			length
		}),
	copyState = (source: State, overridesObj: Partial<State> = {}): State =>
		Object.assign(
			{},
			source,
			{
				block: [...source.block],
				padding: [...source.padding]
			},
			overridesObj
		),
	init = (initObj: State): State =>
		copyState(initObj, {
			byteCount: 0,
			state0: 0x67452301,
			state1: 0xefcdab89,
			state2: 0x98badcfe,
			state3: 0x10325476
		}),
	initialInit = (): State =>
		init({
			padding: getEmptyArray(64).map((_, index) => (index === 0 ? 0x80 : 0)),
			block: getEmptyArray(64)
		}),
	nBitsGenerator = function* (nBits: number): Generator<number, void, boolean> {
		while (nBits >= 6) {
			nBits = (Math.floor(nBits / 6) - 1) * 6;
			yield nBits;
		}
	},
	utfTextValue = (code: number) => (nBits: number): number => 0x80 + ((code >>> nBits) & 0x3f),
	nBitsMatches = [
		[0x00000800, 11],
		[0x00010000, 16],
		[0x00200000, 21],
		[0x04000000, 26],
		[0x80000000, 31],
		[Infinity, 0]
	],
	initialNBits = (code: number): number => nBitsMatches.find(([hexValue]) => code < hexValue)[1],
	initialUtfTextForCodeMoreThan0x80 = (code: number, nBits: number): number =>
		((0xfe << nBits % 6) & 0xff) | (code >>> (Math.floor(nBits / 6) * 6)),
	utfTextForCodeMoreThan0x80 = (code: number): number[] =>
		((nBits: number): number[] => [
			initialUtfTextForCodeMoreThan0x80(code, nBits),
			...[...nBitsGenerator(nBits)].map(utfTextValue(code))
		])(initialNBits(code)),
	toUTFArray = (stringToEncode: string): number[] =>
		Array.from(stringToEncode)
			.map(x => x.charCodeAt(0))
			.reduce((utfText, code) => [...utfText, ...(code < 0x80 ? [code] : utfTextForCodeMoreThan0x80(code))], []),
	toUnsigned = (x: number): number => (x + 0x100000000) % 0x100000000,
	lShift = (x: number, s: number): number => (x << s) | (x >>> (32 - s)),
	// F, G, H and I are basic MD5 functions.
	F = (X: number, Y: number, Z: number): number => toUnsigned((X & Y) | (~X & Z)),
	G = (X: number, Y: number, Z: number): number => toUnsigned((X & Z) | (Y & ~Z)),
	H = (X: number, Y: number, Z: number): number => toUnsigned(X ^ Y ^ Z),
	I = (X: number, Y: number, Z: number): number => toUnsigned(Y ^ (X | ~Z)),
	// FF, GG, HH, and II transformations for rounds 1-4.
	XX = (func: (X: number, Y: number, Z: number) => number) => (xi: number, s: number) => ([
		a,
		b,
		c,
		d,
		i,
		x
	]: Block): Block => [d, toUnsigned(lShift(a + func(b, c, d) + x[xi] + T[i], s) + b), b, c, i + 1, x],
	FF = XX(F),
	GG = XX(G),
	HH = XX(H),
	II = XX(I),
	modifyStates = stateObj => ([a, b, c, d]: Block): State =>
		copyState(stateObj, {
			state0: toUnsigned(stateObj.state0 + a),
			state1: toUnsigned(stateObj.state1 + b),
			state2: toUnsigned(stateObj.state2 + c),
			state3: toUnsigned(stateObj.state3 + d)
		}),
	x = (stateObj: State): number[] =>
		getEmptyArray(16).map(
			(_, j) =>
				((stateObj.block[j * 4 + 3] * 256 + stateObj.block[j * 4 + 2]) * 256 + stateObj.block[j * 4 + 1]) *
					256 +
				stateObj.block[j * 4]
		),
	//
	// MD5 basic transformation. Transforms state based on block.
	//
	transformBlock = (stateObj: State): State =>
		pipe(
			FF(0, 7),
			FF(1, 12),
			FF(2, 17),
			FF(3, 22),
			FF(4, 7),
			FF(5, 12),
			FF(6, 17),
			FF(7, 22),
			FF(8, 7),
			FF(9, 12),
			FF(10, 17),
			FF(11, 22),
			FF(12, 7),
			FF(13, 12),
			FF(14, 17),
			FF(15, 22),
			GG(1, 5),
			GG(6, 9),
			GG(11, 14),
			GG(0, 20),
			GG(5, 5),
			GG(10, 9),
			GG(15, 14),
			GG(4, 20),
			GG(9, 5),
			GG(14, 9),
			GG(3, 14),
			GG(8, 20),
			GG(13, 5),
			GG(2, 9),
			GG(7, 14),
			GG(12, 20),
			HH(5, 4),
			HH(8, 11),
			HH(11, 16),
			HH(14, 23),
			HH(1, 4),
			HH(4, 11),
			HH(7, 16),
			HH(10, 23),
			HH(13, 4),
			HH(0, 11),
			HH(3, 16),
			HH(6, 23),
			HH(9, 4),
			HH(12, 11),
			HH(15, 16),
			HH(2, 23),
			II(0, 6),
			II(7, 10),
			II(14, 15),
			II(5, 21),
			II(12, 6),
			II(3, 10),
			II(10, 15),
			II(1, 21),
			II(8, 6),
			II(15, 10),
			II(6, 15),
			II(13, 21),
			II(4, 6),
			II(11, 10),
			II(2, 15),
			II(9, 21),
			modifyStates(stateObj)
		)([stateObj.state0, stateObj.state1, stateObj.state2, stateObj.state3, 0, x(stateObj)] as Block),
	update = (inputArray: number[], inputLength: number = inputArray.length) => (stateObj: State): State =>
		inputArray.slice(0, inputLength).reduce((stateObj, item) => {
			stateObj.block[stateObj.byteCount % 64] = item;
			if (++stateObj.byteCount % 64 === 0) {
				stateObj = transformBlock(stateObj);
			}
			return stateObj;
		}, copyState(stateObj)),
	set32Little = (value: number, index: number) => (array: number[]): number[] =>
		range(0, 3).reduce((arr, i) => ((arr[index + i] = (value >>> (i * 8)) & 0xff), arr), [...array]),
	getBits = (stateObj: State): number[] =>
		pipe(
			set32Little(stateObj.byteCount * 8, 0),
			set32Little(Math.floor((stateObj.byteCount * 8) / 0x100000000), 4)
		)(getEmptyArray(8)),
	alignIndex = (index: number): number =>
		([
			[56, (ind: number): number => 120 - ind],
			[-Infinity, (ind: number): number => 56 - ind]
		].find((range: [number, (ind: number) => number]) => index >= range[0])[1] as (ind: number) => number)(index),
	getIndex = (stateObj: State): number => alignIndex(stateObj.byteCount % 64),
	updateWithIndex = (stateObj: State): State => update(stateObj.padding, getIndex(stateObj))(stateObj),
	getFinalDigestObj = (stateObj: State): State => ({
		digest: pipe(
			set32Little(stateObj.state0, 0),
			set32Little(stateObj.state1, 4),
			set32Little(stateObj.state2, 8),
			set32Little(stateObj.state3, 12)
		)(getEmptyArray(16)),
		padding: [...stateObj.padding],
		block: [...stateObj.block]
	}),
	finalDigest = (stateObj: State): State =>
		pipe(updateWithIndex, update(getBits(stateObj)), getFinalDigestObj)(stateObj),
	hexByte = (x: number): string => (x < 16 ? "0" : "") + x.toString(16),
	toHexString = (byteArray: number[]): string => byteArray.reduce((acc, x) => acc + hexByte(x), "").toLowerCase(),
	finalHexDigest = (stateObj: State): string => toHexString(finalDigest(stateObj).digest),
	expandArrayTo64Length = (original: number[]): number[] => [
		...original,
		...(Array.from({
			length: 64 - original.length
		}).fill(0) as number[])
	],
	updateWithDigest = (stateObj: State): State => update(stateObj.digest)(stateObj),
	performCram = (passwordAsUTFArray: number[], cramKey: string, stateObj: State): string => {
		const paddedKey: number[] = expandArrayTo64Length(
			passwordAsUTFArray.length > 64
				? ((stateObj = pipe(update(passwordAsUTFArray), finalDigest, init)(stateObj)), stateObj.digest)
				: passwordAsUTFArray
		).map(sym => sym ^ 0x36);

		// H(K XOR ipad, text) -> digest
		return pipe(
			update(paddedKey),
			update(toUTFArray(cramKey)),
			finalDigest,
			init,
			update(paddedKey.map(sym => sym ^ 0x36 ^ 0x5c)),
			updateWithDigest,
			finalHexDigest
		)(stateObj);
	},
	/**
	 * Generates MD5 hash from passwordString and cramKey
	 *
	 * @param {string} passwordString Is a secret (password) to hash.
	 * @param {string} cramKey Is a key (digest) to hash password with.
	 * @returns {string} Is resulting hash.
	 */
	cramMd5Digest = (passwordString: string, cramKey: string): string =>
		performCram(toUTFArray(passwordString), cramKey, initialInit()),
	encodeTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
	getPaddingSymbol = (padding: boolean): "=" | "" => (padding ? "=" : ""),
	postBase64Actions = (base64Sequence: string, encodeTable: string, md5Binary: number[], padding: boolean): string =>
		base64Sequence +
		encodeTable.charAt(md5Binary[30] >>> 2) +
		encodeTable.charAt(((md5Binary[30] << 4) & 0x30) | (md5Binary[30 + 1] >>> 4)) +
		encodeTable.charAt((md5Binary[31] << 2) & 0x3c) +
		getPaddingSymbol(padding),
	base64EncodeIndexGenerator = (): number[] =>
		Array.from(
			{
				length: 10
			},
			(_, i) => i * 3
		),
	getBase64Sequence = (md5Binary: number[]): string =>
		base64EncodeIndexGenerator().reduce(
			(result, index) =>
				result +
				encodeTable.charAt(md5Binary[index] >>> 2) +
				encodeTable.charAt(((md5Binary[index] << 4) & 0x30) | (md5Binary[index + 1] >>> 4)) +
				encodeTable.charAt(((md5Binary[index + 1] << 2) & 0x3c) | (md5Binary[index + 2] >>> 6)) +
				encodeTable.charAt(md5Binary[index + 2] & 0x3f),
			""
		),
	base64Encode = (md5Binary: number[], padding: boolean): string =>
		postBase64Actions(getBase64Sequence(md5Binary), encodeTable, md5Binary, padding),
	/**
	 * Generates MD5 hash from passwordString and cramKey and encodes it in Base64.
	 *
	 * @param {string} passwordString Is a password to hash.
	 * @param {string} cramKey Is a key to hash password with.
	 * @param {boolean} [padding=false] If true there is Base64 padding (=) added.
	 * @returns {string} Is resulting hash.
	 */
	cramMd5DigestBase64 = (passwordString: string, cramKey: string, padding = false): string =>
		base64Encode(
			Array.from(cramMd5Digest(passwordString, cramKey)).map(char => char.charCodeAt(0)),
			padding
		);

export { cramMd5Digest, cramMd5DigestBase64 };
