import { BufferWriter, BufferReader } from '../src/index';

describe('BufferWriter tests', () => {

    it('WriteDoubleLE', () => {
        const buffer = Buffer.alloc(16)
        const bw = new BufferWriter(buffer)
        let offset = bw.writeDoubleLE(16.9)
        expect(offset).toBe(8)
        expect(offset).toBe(bw.position)

        offset = bw.writeDoubleLE(67.9)
        expect(offset).toBe(16)
        expect(offset).toBe(bw.position)
    })

    it('WriteBuffer', () => {
        const buffer = Buffer.alloc(256)
        const target1 = Buffer.from([2, 9, 2, 1, 6, 9])
        const target2 = Buffer.from([2, 19, 2, 1, 6, 7])

        const bw = new BufferWriter(buffer)
        let offset = bw.writeBuffer(target1)
        expect(offset).toBe(6)
        expect(offset).toBe(bw.position)
        expect(buffer.length).toBe(256)

        offset = bw.writeBuffer(target2)
        expect(offset).toBe(12)
        expect(offset).toBe(bw.position)

        const bufferSlice = buffer.slice(0, 12)
        const bufferConcat = Buffer.concat([target1, target2])

        expect(bufferConcat.length).toBe(12)
        expect(bufferConcat.equals(bufferSlice)).toBeTruthy()
    })

    it('demo 1', () => {
        const buffer = Buffer.alloc(256)
        const bufferWriter = new BufferWriter(buffer)
        bufferWriter.writeDouble(12.5)
        bufferWriter.writeDouble(67.7)

        const bufferReader = new BufferReader(buffer)
        let value = bufferReader.nextDouble()
        expect(value).toBe(12.5)

        value = bufferReader.nextDouble()
        expect(value).toBe(67.7)
    })

    it('demo 2', () => {
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

        expect(i1).toBe(8)
        expect(i2).toBe(16)
        expect(i3).toBe(32)
        expect(i4).toBe(54.8765)
    })

    it('position - write', () => {
        const buffer = Buffer.alloc(256);
        const bw = new BufferWriter(buffer);
        expect(bw.position).toBe(0);

        bw.writeUInt8(2);
        expect(bw.position).toBe(1);

        bw.writeUInt8(3);
        expect(bw.position).toBe(2);

        bw.writeString('hello');
        expect(bw.position).toBe(7);

        bw.writeString('hello');
        expect(bw.position).toBe(12);

        bw.writeBuffer(Buffer.from([4, 5]));
        expect(bw.position).toBe(14);
    });
})