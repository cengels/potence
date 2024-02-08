import benny from 'benny';

export default benny.suite('indexOf',
    benny.add('by using indexOf', () => {
        const array = new Array(1500).fill(0).map((_, i) => i);

        return () => array.indexOf(1450);
    }),
    benny.add('by using an iterator', () => {
        const iterator = new Array(1500).fill(0).map((_, i) => i)[Symbol.iterator]();

        return () => {
            let i = 0;
            for (const element of iterator) {
                if (element === 1450) {
                    return i;
                }

                i++;
            }
        }
    }),
    benny.cycle(),
    benny.complete()
);
