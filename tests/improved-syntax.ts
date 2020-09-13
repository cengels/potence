type OnFunction<TArgs extends unknown[]> = (...args: TArgs) => void;
type ReturnsFunction<T, TArgs extends unknown[]> = (value: T, onFunc: (on: OnFunction<TArgs>) => void) => void;

// any is necessary here (no other type will work without error)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function method<T extends (...args: any[]) => any>(name: string, func: T, test: (returns: ReturnsFunction<ReturnType<T>, Parameters<T>>) => void): void {
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
