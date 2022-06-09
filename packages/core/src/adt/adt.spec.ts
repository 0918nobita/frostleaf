import { z } from "zod";
import { adt, genericADT, MapSchemaToDesc } from ".";

const myTypeSchema = {
    foo: z.number(),
    bar: z.tuple([z.string(), z.number()]),
};

type MyTypeDescriptor = MapSchemaToDesc<typeof myTypeSchema>;

type MyGenericTypeDescriptor<T> = {
    foo: number;
    bar: [string, T];
};

declare module "." {
    interface Descriptor {
        MyType: MyTypeDescriptor;
    }

    interface Descriptor1<A> {
        MyGenericType: MyGenericTypeDescriptor<A>;
    }
}

describe("ADT", () => {
    test("simple", () => {
        const myADT = adt("MyType");
        const variant = myADT.variant;
        const match = myADT.match;

        const val = variant("bar", ["hello", 12]);
        expect(val).toEqual({
            _type: "MyType",
            tag: "bar",
            params: ["hello", 12],
        });

        const actual = match(val, {
            foo: (n) => n,
            bar: ([, n]) => n,
        });
        expect(actual).toBe(12);
    });

    test("with validation", () => {
        const myADT = adt("MyType").withValidation(myTypeSchema);
        const variant = myADT.variant;

        const val = variant("bar", ["hello", 12]);
        expect(val).toEqual({
            kind: "ok",
            value: ["hello", 12],
        });
    });

    test("generic", () => {
        const myADT = genericADT("MyGenericType");

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
