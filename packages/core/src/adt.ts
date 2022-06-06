export type ADTValue<
    TDef extends {
        tag: TEnum;
        variants: { [_ in keyof TDef["variants"]]: unknown[] };
    },
    TVariant extends keyof TDef["variants"] = keyof TDef["variants"],
    TEnum extends symbol = TDef["tag"]
> = { enumTag: TEnum; variant: TVariant; params: TDef["variants"][TVariant] };

export type MakeVariant<
    TDef extends {
        tag: TEnum;
        variants: { [_ in keyof TDef["variants"]]: unknown[] };
    },
    TEnum extends symbol = TDef["tag"]
> = <TVariant extends keyof TDef["variants"]>(
    variant: TVariant,
    ...params: TDef["variants"][TVariant]
) => ADTValue<TDef, TVariant, TEnum>;

export const variant =
    <
        TDef extends {
            tag: TEnum;
            variants: { [_ in keyof TDef["variants"]]: unknown[] };
        },
        TEnum extends symbol = TDef["tag"]
    >(
        enumTag: TEnum
    ): MakeVariant<TDef, TEnum> =>
    <TVariant extends keyof TDef["variants"]>(
        variant: TVariant,
        ...params: TDef["variants"][TVariant]
    ) => ({ enumTag, variant, params });

export type Match<
    TDef extends {
        tag: TEnum;
        variants: { [_ in keyof TDef["variants"]]: unknown[] };
    },
    TEnum extends symbol = TDef["tag"]
> = <TVariant extends keyof TDef["variants"], TOut>(
    value: ADTValue<TDef, TVariant, TEnum>,
    matchers: {
        [V in keyof TDef["variants"]]: (...params: TDef["variants"][V]) => TOut;
    }
) => TOut;

export const match =
    <
        TDef extends {
            tag: TEnum;
            variants: { [_ in keyof TDef["variants"]]: unknown[] };
        },
        TEnum extends symbol = TDef["tag"]
    >(
        enumTag: TEnum
    ): Match<TDef, TEnum> =>
    <TVariant extends keyof TDef["variants"], TOut>(
        value: ADTValue<TDef, TVariant, TEnum>,
        matchers: {
            [V in keyof TDef["variants"]]: (
                ...params: TDef["variants"][V]
            ) => TOut;
        }
    ) => {
        if (value.enumTag !== enumTag)
            throw new Error(
                `Invalid enum (Expected: ${String(enumTag)}, Actual: ${String(
                    value.enumTag
                )})`
            );
        return matchers[value.variant](...value.params);
    };
