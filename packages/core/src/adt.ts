export type ADTValue<
    TEnum extends symbol,
    TDef extends { [_ in keyof TDef]: unknown[] },
    TVariant extends keyof TDef = keyof TDef
> = { enum: TEnum; variant: TVariant; params: TDef[TVariant] };

export type MakeVariant<
    TEnum extends symbol,
    TDef extends { [_ in keyof TDef]: unknown[] }
> = <TVariant extends keyof TDef>(
    variant: TVariant,
    ...params: TDef[TVariant]
) => ADTValue<TEnum, TDef, TVariant>;

export const variant =
    <TEnum extends symbol, TDef extends { [_ in keyof TDef]: unknown[] }>(
        e: TEnum
    ): MakeVariant<TEnum, TDef> =>
    <TVariant extends keyof TDef>(
        variant: TVariant,
        ...params: TDef[TVariant]
    ) => ({ enum: e, variant, params });

export type Match<
    TEnum extends symbol,
    TDef extends { [_ in keyof TDef]: unknown[] }
> = <TVariant extends keyof TDef, TOut>(
    value: ADTValue<TEnum, TDef, TVariant>,
    matchers: { [V in keyof TDef]: (...params: TDef[V]) => TOut }
) => TOut;

export const match =
    <TEnum extends symbol, TDef extends { [_ in keyof TDef]: unknown[] }>(
        e: TEnum
    ): Match<TEnum, TDef> =>
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
