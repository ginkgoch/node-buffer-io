import assert from 'assert';

export default function (offset: number, current: number, length: number, origin: boolean | 'begin' | 'end' | 'current' = true): number {
    if (typeof origin === 'boolean') {
        if (!origin) {
            offset += current;
        }
    }
    else {
        if (origin === 'current') {
            offset += current;
        }
        else if (origin === 'end') {
            offset = length - offset;
        }
    }

    assert(offset >= 0 && offset <= length, 'Offset out of range.');
    return offset;
}