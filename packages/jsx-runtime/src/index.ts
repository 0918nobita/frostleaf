type Node = {
    tag: string;
    attrs: Record<string, unknown>;
};

export const jsx = (
    tag: string,
    attrs: Record<string, unknown>,
): Node => ({
    tag,
    attrs,
});

export const jsxs = (
    tag: string,
    attrs: Record<string, unknown>,
): Node => ({
    tag,
    attrs,
});

export const Fragment = "fragment";
