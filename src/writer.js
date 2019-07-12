const assert = require('assert');

module.exports = class BufferWriter {

    /**
     *
     * @param {Buffer} buffer
     */
    constructor (buffer) {
        assert(Buffer.isBuffer(buffer), 'Invalid buffer.');
        this.buffer = buffer
        this.offset = 0
    }

    seek(offset, fromBeginning = true) {
        if(!fromBeginning) {
            offset += this.offset
        }

        this._checkOffsetInRange(offset)
        this.offset = offset
    }

    writeDouble(value) {
        return this.writeDoubleLE(value)
    }

    writeDoubleLE(value) {
        return this._writeXX('DoubleLE', value)
    }

    writeDoubleBE(value) {
        return this._writeXX('DoubleBE', value)
    }

    writeFloat(value) {
        return this.writeFloatLE(value)
    }

    writeFloatLE(value) {
        return this._writeXX('FloatLE', value)
    }

    writeFloatBE(value) {
        return this._writeXX('FloatBE', value)
    }

    writeInt32(value) {
        return this.writeInt32LE(value)
    }

    writeInt32LE(value) {
        return this._writeXX('Int32LE', value)
    }

    writeInt32BE(value) {
        return this._writeXX('Int32BE', value)
    }

    writeUInt32(value) {
        return this.writeUInt32LE(value)
    }

    writeUInt32LE(value) {
        return this._writeXX('UInt32LE', value)
    }

    writeUInt32BE(value) {
        return this._writeXX('UInt32BE', value)
    }

    writeUInt16(value) {
        return this.writeUInt16LE(value)
    }

    writeUInt16LE(value) {
        return this._writeXX('UInt16LE', value)
    }

    writeUInt16BE(value) {
        return this._writeXX('UInt16BE', value)
    }

    writeInt16(value) {
        return this.writeInt16LE(value)
    }

    writeInt16LE(value) {
        return this._writeXX('Int16LE', value)
    }

    writeInt16BE(value) {
        return this._writeXX('Int16BE', value)
    }

    writeUInt8(value) {
        return this._writeXX('UInt8', value)
    }

    writeInt8(value) {
        return this._writeXX('Int8', value)
    }

    writeBuffer(buffer) {
        assert(buffer, 'Buffer cannot be null.')
        this.buffer = Buffer.concat([this.buffer, buffer])
        this.offset += buffer.length
        return this.offset
    }

    writeString(str, encoding = 'utf-8') {
        let length = this.buffer.length - this.offset
        this.offset = this.buffer.write(str, this.offset, length, encoding)
        return this.offset

    }

    _writeXX(type, value) {
        this.offset = this.buffer[`write${type}`](value, this.offset)
        return this.offset
    }

    _checkPositive(number, name = 'Length') {
        assert(number >= 0, `${name} must be positive.`)
    }

    _checkOffsetInRange(offset) {
        assert(offset >= 0 && offset <= this.buffer.length, 'Offset out of range.')
    }
}