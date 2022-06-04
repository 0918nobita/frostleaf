import { Component, Element as E } from "@frostleaf/core";

type AnyObj = Record<string, unknown>;
type AnyElement = E<AnyObj>;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        type Element = AnyElement | Promise<AnyElement>;

        type IntrinsicElements = {
            p: {
                id?: string;
            };
        };

        type ElementClass = Component<Record<string, unknown>>;
    }
}
