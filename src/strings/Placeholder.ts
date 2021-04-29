import { StringIterator } from './StringIterator';

export type PlaceholderType = 'float' | 'int' | 'string' | '';

const shortToLongTable: Record<string, PlaceholderType> = {
    'f': 'float',
    'd': 'int',
    's': 'string'
};

/** 
 * Represents a placeholder that can be used to match against a string.
 */
export default class Placeholder {
    /** The placeholder's name. */
    public name: string = '';
    private type: PlaceholderType = '';
    private length?: number;
    private decimals?: number;

    public constructor(string: string) {
        if (string.length > 0) {
            const iterator = new StringIterator(string);
            let charsToPercentage = iterator.findNext('%');

            if (charsToPercentage === -1) {
                charsToPercentage = string.length;
            }

            this.name = iterator.next(charsToPercentage);
            iterator.next();  // skip the %

            if (!iterator.isAtEnd()) {
                this.length = iterator.nextInt();
                
                if (iterator.skip('.')) {
                    this.decimals = iterator.nextInt();

                    if (this.decimals == null) {
                        // If there's a period, there must be a number after.
                        throw new Error('Invalid placeholder string. Must specify decimal places if period is used.');
                    }
                }

                const shorthandType = iterator.toEnd();

                if (shorthandType != null) {
                    const longhandType = shortToLongTable[shorthandType];

                    if (longhandType == null) {
                        throw new Error(`Invalid placeholder string. Unknown type: ${shorthandType}`);
                    }

                    this.type = longhandType;
                }
            }
        }

        if (this.type !== 'float' && this.decimals != null) {
            throw new Error('Invalid placeholder string. When specifying decimal places, you must use the float type (f).');
        }
    }

    /** 
     * If this placeholder matches against the entirety of the specified
     * string, returns the matched substring or number, otherwise returns
     * `undefined`.
     */
    public match(string: string): string | number | undefined {
        if (this.type === 'float' && (this.length != null || this.decimals != null)) {
            const periodIndex = string.indexOf('.');

            if (periodIndex == null) {
                return undefined;
            }
            
            if (this.length != null && string.slice(0, periodIndex).length !== this.length) {
                return undefined;
            }

            if (this.decimals != null && string.slice(periodIndex + 1).length !== this.decimals) {
                return undefined;
            }
        } else if (this.type !== 'float' && this.length != null && string.length !== this.length) {
            return undefined;
        }
        
        if (this.type === '') {
            return string;
        }

        if (this.type === 'int' && string.includes('.')) {
            return undefined;
        }

        const number = Number(string);

        if (this.type === 'float' || this.type === 'int') {
            if (Number.isNaN(number)) {
                return undefined;
            }

            return number;
        }

        if (Number.isNaN(number)) {
            return string;
        }

        return undefined;
    }
}
