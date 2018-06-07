# cram-md5-digest-js<!-- omit in toc -->

[CRAM-MD5](https://en.wikipedia.org/wiki/CRAM-MD5) digester implementation in JavaScript with zero dependencies.

It uses a digest string from server and generates a hash using a secret (usually, password).

The library supports converting the resulting hash to Base64-encoded string.

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
	- [cramMd5Digest](#crammd5digest)
	- [cramMd5DigestBase64](#crammd5digestbase64)

## Installation

```
npm install @constantiner/cram-md5-digest
```

## Usage

```javascript
import { cramMd5DigestBase64 } from "@constantiner/cram-md5-digest";

cramMd5DigestBase64("voxjx70j131lv9g645j6Znx8535l5Xb1nkl6CF0489lE2Gc^b*H&F5jn", "1$G15/iw");
```

It also contains UMD supported JS file to use, for example, with CommonJS environment (or AMD):

```javascript
const { cramMd5DigestBase64 } = require("@constantiner/cram-md5-digest");
```
Remember that UMD version is ES5 compatible but you need to use [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/) with it.

## Documentation

### cramMd5Digest

```javascript
import { cramMd5Digest } from "@constantiner/cram-md5-digest";
```

Generates MD5 hash from `passwordString` and `cramKey`.

It has the following parameters:

* `passwordString` Is a secret (password) to hash (`String`).
* `cramKey` Is a key (digest) to hash password with (`String`).

It returns a 32 symbols length string with calculated hash.

### cramMd5DigestBase64

```javascript
import { cramMd5DigestBase64 } from "@constantiner/cram-md5-digest";
```

Generates MD5 hash from `passwordString` and `cramKey` and encodes it in Base64.

It has the following parameters:

* `passwordString` Is a secret (password) to hash (`String`).
* `cramKey` Is a key (digest) to hash password with (`String`).
* `padding` (optional, default value is `false`) if `true` there is Base64 padding (=) added.

It returns a string with Base64-encoded hash (with padding or not).
