import { adt, genericADT } from "./adt";

type MyGenericTypeDescriptor<T> = {
    foo: number;
    bar: [string, T];
};

declare module "./hkt" {
    interface HKT<T> {
        MyGenericTypeDescriptor: MyGenericTypeDescriptor<T>;
    }
}

describe("ADT", () => {
    test("simple", () => {
        type MyTypeDescriptor = {
            foo: number;
            bar: [string, number];
        };

        const myADT = adt<MyTypeDescriptor>();
        const variant = myADT.variant;
        const match = myADT.match;

        const actual = match(variant("bar", ["hello", 12]), {
            foo: (n) => n,
            bar: ([, n]) => n,
        });
        expect(actual).toBe(12);
    });

    test("generic", () => {
        const myADT = genericADT("MyGenericTypeDescriptor");

        const variantNum = myADT.makeVariantFn<number>();

        const val1 = variantNum("bar", ["hello", 42]);

        const match = myADT.makeMatchFn<number>();

        const actual = match(val1, {
            foo: (n) => n,
            bar: ([, n]) => n,
        });
        expect(actual).toBe(42);
    });
});
