# Ginkgoch Buffer IO for NodeJS
This is a NodeJS library to help to read/write [Buffer](https://cn.nodejs.org/api/buffer.html) instance easily.

## Install
```terminal
npm i ginkgoch-buffer-io --save
```

## Test
```terminal
npm test
```

## BufferReader Example

**Without `Ginkgoch Buffer I/O`**
```js
const buffer = Buffer.alloc(16);
buffer.writeInt8(8, 0);
buffer.writeInt16LE(16, 1);
buffer.writeUInt32LE(32, 3);
buffer.writeDoubleBE(54.8765, 7);

let i1 = buffer.readInt8(0);
let i2 = buffer.readInt16LE(1);
let i3 = buffer.readUInt32LE(3);
let i4 = buffer.readDoubleBE(7);
```

**With `Ginkgoch Buffer I/O`**
It automatically manages the read position for you. You don't need to remember the position and the boring type length calculations.
```js
const { BufferReader, BufferWriter } = require('ginkgoch-buffer-io');

const buffer = Buffer.alloc(16);
const bw = new BufferWriter(buffer);
bw.writeInt8(8);
bw.writeInt16(16);
bw.writeUInt32(32);
bw.writeDoubleBE(54.8765);

const br = new BufferReader(buffer);
let i1 = br.nextInt8();
let i2 = br.nextInt16();
let i3 = br.nextUInt32();
let i4 = br.nextDoubleBE();
```

## BufferReader
* constructor(buffer: Buffer)
* seek(offset: number, fromBeginning = true)
* nextBuffer(length: number)
* nextString(length: number, encoding = 'utf-8')
* nextInt8()
* nextUInt8()
* nextUInt16()
* nextUInt16LE()
* nextUInt16BE()
* nextInt16()
* nextInt16LE()
* nextInt16BE()
* nextUInt32()
* nextUInt32LE()
* nextUInt32BE()
* nextInt32()
* nextInt32LE()
* nextInt32BE()
* nextFloat()
* nextFloatLE()
* nextFloatBE()
* nextDouble()
* nextDoubleLE()
* nextDoubleBE()

## BufferWriter
* constructor(buffer: Buffer)
* seek(offset: number[, fromBeginning = true])
* writeBuffer(length: number)
* writeString(length: number[, encoding = 'utf-8'])
* writeInt8()
* writeUInt8()
* writeUInt16()
* writeUInt16LE()
* writeUInt16BE()
* writeInt16()
* writeInt16LE()
* writeInt16BE()
* writeUInt32()
* writeUInt32LE()
* writeUInt32BE()
* writeInt32()
* writeInt32LE()
* writeInt32BE()
* writeFloat()
* writeFloatLE()
* writeFloatBE()
* writeDouble()
* writeDoubleLE()
* writeDoubleBE()

## Issues
Contact [ginkgoch@outlook.com](mailto:ginkgoch@outlook.com) or [sumbit an issue](https://github.com/ginkgoch/node-buffer-reader/issues).