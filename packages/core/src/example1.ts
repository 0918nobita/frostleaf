import { adt, TypeOf } from "./adt";

type MyTypeDescriptor = {
    foo: number;
    bar: [string, number];
};

type MyType = TypeOf<MyTypeDescriptor>;
// { tag: "foo", params: number } | { tag: "bar", params: [string, number] }

const myADT = adt<MyTypeDescriptor>();
const variant = myADT.variant;
const match = myADT.match;

console.log(
    match(variant("bar", ["hello", 12]), {
        foo: (n) => n,
        bar: ([, n]) => n,
    })
); // => 12
