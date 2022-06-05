import { Component, Element as E } from "./dist/types";

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
            title: {};
        };

        type ElementClass = Component<Record<string, unknown>>;
    }
}
