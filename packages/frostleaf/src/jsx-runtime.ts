export { Fragment } from "./types";

import { Component, Element, Fragment } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropsWithChild<Props> = Props & { children?: Element<any> };

export const jsx = <Props>(
    tagOrComponent: string | Component<Props> | Fragment,
    props: PropsWithChild<Props>
): Element<Props> => {
    if (tagOrComponent === Fragment)
        return {
            type: Fragment,
            children: props.children ? [props.children] : [],
        };

    if (typeof tagOrComponent === "string") {
        const attrs: Record<string, string> = {};
        for (const [key, value] of Object.entries(props)) {
            if (key === "children") continue;
            if (typeof value !== "string")
                throw new Error(
                    `Invalid attribute value for ${key}: ${String(value)}`
                );
            attrs[key] = value;
        }

        return {
            type: "html-element",
            tag: tagOrComponent,
            attrs,
            children: props.children ? [props.children] : [],
        };
    }

    return {
        type: "component-element",
        component: tagOrComponent as Component<Omit<Props, "children">>,
        props,
        children: props.children ? [props.children] : [],
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropsWithChildren<Props> = Props & { children: Element<any>[] };

export const jsxs = <Props>(
    tagOrComponent: string | Component<Props> | Fragment,
    props: PropsWithChildren<Props>
): Element<Props> => {
    if (tagOrComponent === Fragment)
        return {
            type: Fragment,
            children: props.children || [],
        };

    if (typeof tagOrComponent === "string") {
        const attrs: Record<string, string> = {};
        for (const [key, value] of Object.entries(props)) {
            if (key === "children") continue;
            if (typeof value !== "string")
                throw new Error(
                    `Invalid attribute value for ${key}: ${String(value)}`
                );
            attrs[key] = value;
        }

        return {
            type: "html-element",
            tag: tagOrComponent,
            attrs,
            children: props.children || [],
        };
    }

    return {
        type: "component-element",
        component: tagOrComponent as Component<Omit<Props, "children">>,
        props,
        children: props.children || [],
    };
};
