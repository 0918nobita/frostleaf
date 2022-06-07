import { HKT } from "./hkt";

export type TypeOf<TDesc> = {
    [V in keyof TDesc]: { tag: V; params: TDesc[V] };
}[keyof TDesc];

type Matchers<TDesc, TOut> = { [V in keyof TDesc]: (params: TDesc[V]) => TOut };

export const adt = <TDesc>() => ({
    variant: <TVariant extends keyof TDesc>(
        tag: TVariant,
        params: TDesc[TVariant]
    ): TypeOf<TDesc> => ({
        tag,
        params,
    }),

    match: <TOut>(
        value: TypeOf<TDesc>,
        matchers: Matchers<TDesc, TOut>
    ): TOut => matchers[value.tag](value.params),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const genericADT = <URI extends keyof HKT<unknown>>(_uri: URI) => ({
    makeVariantFn:
        <A>() =>
        <TVariant extends keyof HKT<A>[URI]>(
            variant: TVariant,
            params: HKT<A>[URI][TVariant]
        ): TypeOf<HKT<A>[URI]> => ({ tag: variant, params }),

    makeMatchFn:
        <A>() =>
        <TOut>(
            value: TypeOf<HKT<A>[URI]>,
            matchers: Matchers<HKT<A>[URI], TOut>
        ): TOut =>
            matchers[value.tag](value.params),
});
