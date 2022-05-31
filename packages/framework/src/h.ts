import { Component, Element } from "./types";

export const h = <Props extends Record<string, unknown>>(
    tagOrComponent: string | Component<Props>,
    props: Props,
    children: Element<any>[]
): Element<Props> => {
    if (typeof tagOrComponent === "string") {
        const attrs: Record<string, string> = {};
        for (const [key, value] of Object.entries(props)) {
            if (typeof value !== "string")
                throw new Error(`Invalid attribute value for ${key}: ${value}`);
            attrs[key] = value;
        }

        return {
            type: "html-element",
            tag: tagOrComponent,
            attrs,
            children,
        };
    }

    return {
        type: "component-element",
        component: tagOrComponent,
        props,
        children,
    };
};
