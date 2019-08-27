import assert from 'assert';
import calcOffset from './shared';

export default class BufferWriter {
    buffer: Buffer;
    position: number;

    /**
     *
     * @param {Buffer} buffer
     */
    constructor (buffer: Buffer) {
        assert(Buffer.isBuffer(buffer), 'Invalid buffer.');

        this.buffer = buffer
        this.position = 0
    }

    /**
     * 
     * @param offset The offset to seek.
     * @param origin The seek origin. True means seeking from begining. False means seeking from current position. Default is True.
     */
    seek(offset: number, origin: boolean | 'begin' | 'current' | 'end' = true) {
        this.position = calcOffset(offset, this.position, this.buffer.length, origin);
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

        buffer.copy(this.buffer, this.position)
        this.position += buffer.length
        return this.position
    }

    writeString(str: string, encoding: BufferEncoding = 'utf-8') {
        let length = this.buffer.length - this.position
        this.position = this.buffer.write(str, this.position, length, encoding)
        return this.position

    }

    _writeXX(type: string, value: number): number {
        this.position = this.buffer[`write${type}`](value, this.position)
        return this.position
    }

    _checkPositive(number: number, name = 'Length') {
        assert(number >= 0, `${name} must be positive.`)
    }

    _checkOffsetInRange(offset: number) {
        assert(offset >= 0 && offset <= this.buffer.length, 'Offset out of range.')
    }
}