import { genericADT, TypeOf } from "./adt";

type MyGenericTypeDescriptor<T> = {
    foo: number;
    bar: [string, T];
};

type MyGenericType<T> = TypeOf<MyGenericTypeDescriptor<T>>;
// { tag: "foo", params: number } | { tag: "bar", params: [string, T] }

declare module "./hkt" {
    interface HKT<T> {
        MyGenericTypeDescriptor: MyGenericTypeDescriptor<T>;
    }
}

const myADT = genericADT("MyGenericTypeDescriptor");

const variantNum = myADT.makeVariantFn<number>();
const variantBool = myADT.makeVariantFn<boolean>();

const val1 = variantNum("bar", ["hello", 42]);
const val2 = variantBool("bar", ["hello", false]);

const match = myADT.makeMatchFn<number>();

console.log(
    match(val1, {
        foo: (n) => n,
        bar: ([, n]) => n,
    })
); // => 42
