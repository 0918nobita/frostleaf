type ADTValue<
    TEnum extends symbol,
    TDef extends { [_ in keyof TDef]: unknown[] },
    TVariant extends keyof TDef = keyof TDef
> = { enum: TEnum; variant: TVariant; params: TDef[TVariant] };

const variant =
    <TEnum extends symbol, TDef extends { [_ in keyof TDef]: unknown[] }>(
        e: TEnum
    ) =>
    <TVariant extends keyof TDef>(
        variant: TVariant,
        ...params: TDef[TVariant]
    ): ADTValue<TEnum, TDef, TVariant> => ({ enum: e, variant, params });

const match =
    <TEnum extends symbol, TDef extends { [_ in keyof TDef]: unknown[] }>(
        e: TEnum
    ) =>
    <TVariant extends keyof TDef, TOut>(
        value: ADTValue<TEnum, TDef, TVariant>,
        matchers: { [V in keyof TDef]: (...params: TDef[V]) => TOut }
    ) => {
        if (value.enum !== e)
            throw new Error(
                `Invalid enum (Expected: ${String(e)}, Actual: ${String(
                    value.enum
                )})`
            );
        return matchers[value.variant](...value.params);
    };

const foo = Symbol("foo");
const hoge = Symbol("hoge");
const fuga = Symbol("fuga");

type FooADT = {
    [hoge]: [number];
    [fuga]: [string, number];
};

type FooADTValue<TVariant extends keyof FooADT = keyof FooADT> = ADTValue<
    typeof foo,
    FooADT,
    TVariant
>;

const fooVariant = variant<typeof foo, FooADT>(foo);

const hogeVal = fooVariant(hoge, 1);
const fugaVal = fooVariant(fuga, "hello", 2);
console.log({ hogeVal, fugaVal });

const matchFooADT = match<typeof foo, FooADT>(foo);

const getNum = (fooVal: FooADTValue) =>
    matchFooADT(fooVal, { [hoge]: (num) => num, [fuga]: (_, num) => num });

console.log({ hoge: getNum(hogeVal), fuga: getNum(fugaVal) });
