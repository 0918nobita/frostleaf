// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Descriptor {}

export type TypeOf<DescID extends keyof Descriptor> = {
    [V in keyof Descriptor[DescID]]: { tag: V; params: Descriptor[DescID][V] };
}[keyof Descriptor[DescID]] & { _type: DescID };

type Matchers<DescID extends keyof Descriptor, TOut> = {
    [V in keyof Descriptor[DescID]]: (params: Descriptor[DescID][V]) => TOut;
};

export const adt = <DescID extends keyof Descriptor>(_type: DescID) => ({
    variant: <TVariant extends keyof Descriptor[DescID]>(
        tag: TVariant,
        params: Descriptor[DescID][TVariant]
    ): TypeOf<DescID> => ({
        _type,
        tag,
        params,
    }),

    match: <TOut>(
        value: TypeOf<DescID>,
        matchers: Matchers<DescID, TOut>
    ): TOut => matchers[value.tag](value.params),
});

//eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
export interface Descriptor1<A> {}

export type TypeOf1<DescID extends keyof Descriptor1<A>, A> = {
    [V in keyof Descriptor1<A>[DescID]]: {
        tag: V;
        params: Descriptor1<A>[DescID][V];
    };
}[keyof Descriptor1<A>[DescID]] & { _type: DescID };

type Matchers1<DescID extends keyof Descriptor1<A>, A, TOut> = {
    [V in keyof Descriptor1<A>[DescID]]: (
        params: Descriptor1<A>[DescID][V]
    ) => TOut;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const genericADT = <DescID extends keyof Descriptor1<unknown>>(
    _type: DescID
) => ({
    makeVariantFn:
        <A>() =>
        <TVariant extends keyof Descriptor1<A>[DescID]>(
            variant: TVariant,
            params: Descriptor1<A>[DescID][TVariant]
        ): TypeOf1<DescID, A> => ({
            _type,
            tag: variant,
            params,
        }),

    makeMatchFn:
        <A>() =>
        <TOut>(
            value: TypeOf1<DescID, A>,
            matchers: Matchers1<DescID, A, TOut>
        ): TOut =>
            matchers[value.tag](value.params),
});
