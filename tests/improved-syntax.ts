type OnFunction<TArgs extends unknown[]> = (...args: TArgs) => void;
type ReturnsFunction<T, TArgs extends unknown[]> = (value: T, onFunc: (on: OnFunction<TArgs>) => void) => void;

export function method<T extends (...args: unknown[]) => unknown>(name: string, func: T, test: (returns: ReturnsFunction<ReturnType<T>, Parameters<T>>) => void): void {
    describe(`${name} should`, () => {
        test((value, on) => {
            describe(`return ${value} on`, () => {
                on((...args) => {
                    it(args.join(', '), () => expect(func(...args)).toBe(value));
                });
            });
        });
    });
}
