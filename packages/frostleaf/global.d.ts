import { Component, Element as E } from "./dist/types";

type AnyElement = E<any>;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        type Element =
            | AnyElement
            | [AnyElement, string[]]
            | Promise<AnyElement>
            | Promise<[AnyElement, string[]]>;

        type IntrinsicElements = {
            p: {
                id?: string;
            };
            title: {};
        };

        type ElementClass = Component<any>;
    }
}
