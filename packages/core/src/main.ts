import { ADTValue, match, variant } from "./adt";

const foo = Symbol("foo");
const hoge = Symbol("hoge");
const fuga = Symbol("fuga");

type FooADT = {
    tag: typeof foo;
    variants: {
        [hoge]: [number];
        [fuga]: [string, number];
    };
};

type FooADTValue = ADTValue<FooADT>;

const fooVariant = variant<FooADT>(foo);

const hogeVal = fooVariant(hoge, 1);
const fugaVal = fooVariant(fuga, "hello", 2);
console.log({ hogeVal, fugaVal });

const matchFooADT = match<FooADT>(foo);

const getNum = (fooVal: FooADTValue) =>
    matchFooADT(fooVal, { [hoge]: (num) => num, [fuga]: (_, num) => num });

console.log({ hoge: getNum(hogeVal), fuga: getNum(fugaVal) });
