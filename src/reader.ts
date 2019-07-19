import assert from 'assert';

export default class BufferReader {
    buffer: Buffer;
    offset: number;

    constructor(buffer: Buffer) {
        assert(Buffer.isBuffer(buffer), 'Invalid buffer.');
        this.buffer = buffer;
        this.offset = 0;
    }

    seek(offset: number, fromBeginning = true) {
        if(!fromBeginning) {
            offset += this.offset;
        }

        this._checkOffsetInRange(offset);
        this.offset = offset;
    }

    nextDouble(): number {
        return this.nextDoubleLE()
    }

    nextDoubleLE(): number {
        return this._nextXX('DoubleLE', 8);
    }
    
    nextDoubleBE(): number {
        return this._nextXX('DoubleBE', 8);
    }

    nextFloat(): number {
        return this.nextFloatLE()
    }

    nextFloatLE(): number {
        return this._nextXX('FloatLE', 4);
    }
    
    nextFloatBE(): number {
        return this._nextXX('FloatBE', 4);
    }

    nextInt32(): number {
        return this.nextInt32LE()
    }

    nextInt32LE(): number {
        return this._nextXX('Int32LE', 4);
    }
    
    nextInt32BE(): number {
        return this._nextXX('Int32BE', 4);
    }

    nextUInt32(): number {
        return this.nextUInt32LE()
    }

    nextUInt32LE(): number {
        return this._nextXX('UInt32LE', 4);
    }
    
    nextUInt32BE(): number {
        return this._nextXX('UInt32BE', 4);
    }

    nextUInt16(): number {
        return this.nextUInt16LE()
    }

    nextUInt16LE(): number {
        return this._nextXX('UInt16LE', 2);
    }
    
    nextUInt16BE(): number {
        return this._nextXX('UInt16BE', 2);
    }

    nextInt16(): number {
        return this.nextInt16LE()
    }

    nextInt16LE(): number {
        return this._nextXX('Int16LE', 2);
    }
    
    nextInt16BE(): number {
        return this._nextXX('Int16BE', 2);
    }

    nextUInt8(): number {
        return this._nextXX('UInt8', 1);
    }

    nextInt8(): number {
        return this._nextXX('Int8', 1);
    }

    nextBuffer(length: number): Buffer {
        this._checkPositive(length);
        this._checkOffsetInRange(this.offset + length);

        const buffer = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return buffer;
    }

    nextString(length: number, encoding = 'utf-8'): string {
        this._checkPositive(length);
        this._checkOffsetInRange(this.offset + length);
        const str = this.buffer.toString(encoding, this.offset, this.offset + length);
        this.offset += length;
        return str;
    }

    private _nextXX(type: string, size: number): any {
        this._checkOffsetInRange(this.offset + size);

        const methodName = `read${type}`;
        const v = this.buffer[methodName](this.offset);
        this.offset += size;
        return v;
    }

    private _checkPositive(number: number, name = 'Length') {
        assert(number >= 0, `${name} must be positive.`);
    }

    private _checkOffsetInRange(offset: number) {
        assert(offset >= 0 && offset <= this.buffer.length, 'Offset out of range.');
    }
}