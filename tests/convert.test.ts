import { convert } from '../src/numbers/convert.js';

describe('convert() should convert', () => {
    describe('metric (down)', () => {
        it('km to m', () => expect(convert(32, 'km', 'm')).toBeCloseTo(32000));
        it('km to dm', () => expect(convert(32, 'km', 'dm')).toBeCloseTo(320000));
        it('km to cm', () => expect(convert(32, 'km', 'cm')).toBeCloseTo(3200000));
        it('km to mm', () => expect(convert(32, 'km', 'mm')).toBeCloseTo(32000000));
        it('μm to nm', () => expect(convert(32, 'μm', 'nm')).toBeCloseTo(32000));
    });

    describe('metric (up)', () => {
        it('m to km', () => expect(convert(5000, 'm', 'km')).toBeCloseTo(5));
        it('dm to km', () => expect(convert(50000, 'dm', 'km')).toBeCloseTo(5));
        it('cm to km', () => expect(convert(50000, 'cm', 'km')).toBeCloseTo(0.5));
        it('mm to km', () => expect(convert(50000, 'mm', 'km')).toBeCloseTo(0.05));
        it('nm to μm', () => expect(convert(50000, 'nm', 'μm')).toBeCloseTo(50));
    });

    describe('imperial', () => {
        it('mi in inches', () => expect(convert(5, 'mi', 'in')).toBeCloseTo(316800));
    });

    describe('metric to imperial', () => {
        it('km to mi', () => expect(convert(5, 'km', 'mi')).toBeCloseTo(3.10686));
    });
});
