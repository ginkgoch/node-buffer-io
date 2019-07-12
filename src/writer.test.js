const BufferWriter = require('./writer')

describe('BufferWriter tests', () => {

    it('WriteDoubleLE', () => {
        const buffer = Buffer.alloc(16)
        const bw = new BufferWriter(buffer)
        let offset = bw.writeDoubleLE(16.9)
        expect(offset).toBe(8)
        expect(offset).toBe(bw.offset)

        offset = bw.writeDoubleLE(67.9)
        expect(offset).toBe(16)
        expect(offset).toBe(bw.offset)
    })

    it('WriteBuffer', () => {
        const buffer = Buffer.alloc(256)
        const target1 = Buffer.from([2, 9, 2, 1, 6, 9])
        const target2 = Buffer.from([2, 19, 2, 1, 6, 7])

        const bw = new BufferWriter(buffer)
        let offset = bw.writeBuffer(target1)
        expect(offset).toBe(6)
        expect(offset).toBe(bw.offset)

        offset = bw.writeBuffer(target1)
        expect(offset).toBe(12)
        expect(offset).toBe(bw.offset)

        const bufferSlice = buffer.slice(0, 12)
        const bufferConcat = Buffer.concat([target1, target2])

        expect(bufferConcat.length).toBe(12)
        expect(Buffer.compare(bufferSlice, bufferConcat)).toBeTruthy()
    })
})