import assert from 'assert';

export default class BufferWriter {
    buffer: Buffer;
    offset: number;

    /**
     *
     * @param {Buffer} buffer
     */
    constructor (buffer: Buffer) {
        assert(Buffer.isBuffer(buffer), 'Invalid buffer.');

        this.buffer = buffer
        this.offset = 0
    }

    seek(offset: number, fromBeginning = true) {
        if(!fromBeginning) {
            offset += this.offset
        }

        this._checkOffsetInRange(offset)
        this.offset = offset
    }

    writeDouble(value: number): number {
        return this.writeDoubleLE(value)
    }

    writeDoubleLE(value: number): number {
        return this._writeXX('DoubleLE', value)
    }

    writeDoubleBE(value: number): number {
        return this._writeXX('DoubleBE', value)
    }

    writeFloat(value: number): number {
        return this.writeFloatLE(value)
    }

    writeFloatLE(value: number): number {
        return this._writeXX('FloatLE', value)
    }

    writeFloatBE(value: number): number {
        return this._writeXX('FloatBE', value)
    }

    writeInt32(value: number): number {
        return this.writeInt32LE(value)
    }

    writeInt32LE(value: number): number {
        return this._writeXX('Int32LE', value)
    }

    writeInt32BE(value: number): number {
        return this._writeXX('Int32BE', value)
    }

    writeUInt32(value: number): number {
        return this.writeUInt32LE(value)
    }

    writeUInt32LE(value: number): number {
        return this._writeXX('UInt32LE', value)
    }

    writeUInt32BE(value: number): number {
        return this._writeXX('UInt32BE', value)
    }

    writeUInt16(value: number): number {
        return this.writeUInt16LE(value)
    }

    writeUInt16LE(value: number): number {
        return this._writeXX('UInt16LE', value)
    }

    writeUInt16BE(value: number): number {
        return this._writeXX('UInt16BE', value)
    }

    writeInt16(value: number): number {
        return this.writeInt16LE(value)
    }

    writeInt16LE(value: number): number {
        return this._writeXX('Int16LE', value)
    }

    writeInt16BE(value: number): number {
        return this._writeXX('Int16BE', value)
    }

    writeUInt8(value: number): number {
        return this._writeXX('UInt8', value)
    }

    writeInt8(value: number): number {
        return this._writeXX('Int8', value)
    }

    writeBuffer(buffer: Buffer): number {
        assert(buffer, 'Buffer cannot be null.')

        buffer.copy(this.buffer, this.offset)
        this.offset += buffer.length
        return this.offset
    }

    writeString(str: string, encoding: BufferEncoding = 'utf-8') {
        let length = this.buffer.length - this.offset
        this.offset = this.buffer.write(str, this.offset, length, encoding)
        return this.offset

    }

    _writeXX(type: string, value: number): number {
        this.offset = this.buffer[`write${type}`](value, this.offset)
        return this.offset
    }

    _checkPositive(number: number, name = 'Length') {
        assert(number >= 0, `${name} must be positive.`)
    }

    _checkOffsetInRange(offset: number) {
        assert(offset >= 0 && offset <= this.buffer.length, 'Offset out of range.')
    }
}