const foo = Symbol("foo");
const hoge = Symbol("hoge");
const fuga = Symbol("fuga");

type FooADT = {
    [hoge]: [number];
    [fuga]: [string, number];
};

/*
type FooADTValue<TVariant extends keyof FooADT = keyof FooADT> = {
    enum: typeof foo;
    variant: TVariant;
    params: FooADT[TVariant];
};
*/

type ADTValue<
    TEnum extends symbol,
    TDef,
    TVariant extends keyof TDef = keyof TDef
> = { enum: TEnum; variant: TVariant; params: TDef[TVariant] };

const fooADT = <TVariant extends keyof FooADT>(
    variant: TVariant,
    ...params: FooADT[TVariant]
): ADTValue<typeof foo, FooADT, TVariant> => ({
    enum: foo,
    variant,
    params,
});

const matchFooADT = <TVariant extends keyof FooADT, TOut>(
    value: ADTValue<typeof foo, FooADT, TVariant>,
    matchers: { [V in keyof FooADT]: (...params: FooADT[V]) => TOut }
): TOut => matchers[value.variant](...value.params);

const hogeVal = fooADT(hoge, 1);
const fugaVal = fooADT(fuga, "hello", 2);
console.log({ hogeVal, fugaVal });

const getNum = (fooVal: ADTValue<typeof foo, FooADT>) =>
    matchFooADT(fooVal, { [hoge]: (num) => num, [fuga]: (_, num) => num });

console.log({ hoge: getNum(hogeVal), fuga: getNum(fugaVal) });
