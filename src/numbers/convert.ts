import { Assert } from '..';

/* eslint-disable @typescript-eslint/no-namespace */
/** Encompasses all units that can be used in `Numbers.convert()`. */
export namespace Unit {
    /** Encompasses all units of length that can be used in `Numbers.convert()`. */
    export namespace Length {
        /** Encompasses all metric units of length that can be used in `Numbers.convert()`. */
        export namespace Metric {
            export const Kilometer = 'km' as const;
            export const Meter = 'm' as const;
            export const Decimeter = 'dm' as const;
            export const Centimeter = 'cm' as const;
            export const Millimeter = 'mm' as const;
            export const Micrometer = 'μm' as const;
            export const Nanometer = 'nm' as const;
        }

        export type Metric = typeof Metric.Kilometer
            | typeof Metric.Meter
            | typeof Metric.Decimeter
            | typeof Metric.Centimeter
            | typeof Metric.Millimeter
            | typeof Metric.Micrometer
            | typeof Metric.Nanometer;

        /** Encompasses all imperial units of length that can be used in `Numbers.convert()`. */
        export namespace Imperial {
            export const Mile = 'mi' as const;
            export const Yard = 'yd' as const;
            export const Foot = 'ft' as const;
            export const Inch = 'in' as const;
        }

        export type Imperial = typeof Imperial.Mile
            | typeof Imperial.Yard
            | typeof Imperial.Foot
            | typeof Imperial.Inch;
    }

    export type Length = Length.Metric | Length.Imperial;
}

type ConversionTable = Record<Unit, number>;

const conversionTables: ConversionTable[] = [
    {
        // Metric lengths
        [Unit.Length.Metric.Kilometer]: 1000000,
        [Unit.Length.Metric.Meter]: 1000,
        [Unit.Length.Metric.Decimeter]: 100,
        [Unit.Length.Metric.Centimeter]: 10,
        [Unit.Length.Metric.Millimeter]: 1,
        [Unit.Length.Metric.Micrometer]: 0.001,
        [Unit.Length.Metric.Nanometer]: 0.000001,

        // Imperial lengths
        [Unit.Length.Imperial.Mile]: 1609344,
        [Unit.Length.Imperial.Yard]: 914.4,
        [Unit.Length.Imperial.Foot]: 304.8,
        [Unit.Length.Imperial.Inch]: 25.4
    }
];

export type Unit = Unit.Length;

function getConversionTable(unit: Unit): ConversionTable | undefined {
    return conversionTables.find(table => table[unit] != null);
}

/** Converts a number from one unit to another. */
export function convert(source: number, from: Unit.Length, to: Unit.Length): number;
export function convert(source: number, from: Unit, to: Unit): number {
    const conversionTable = getConversionTable(from);
    Assert.that(conversionTable != null, `Conversion failed. Unit ${from} is not a valid unit identifier.`);

    const divisor = conversionTable[from];
    const factor = conversionTable[to];

    if (factor == null) {
        Assert.that(getConversionTable(to) != null, `Conversion failed. Units ${from} and ${to} are not compatible with each other.`);
    }

    Assert.that(factor != null, `Conversion failed. Unit ${to} is not a valid unit identifier.`);

    return source * divisor / factor;
}
