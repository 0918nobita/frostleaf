export { Fragment } from "@frostleaf/core";

import { Component, Element, Fragment } from "@frostleaf/core";

type PropsWithChild<Props> = Props & { children?: Element<any> };

export const jsx = <Props>(
    tagOrComponent: string | Component<Props> | typeof Fragment,
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
                throw new Error(`Invalid attribute value for ${key}: ${value}`);
            attrs[key] = value as string;
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
        component: tagOrComponent,
        props,
        children: props.children ? [props.children] : [],
    };
};

type PropsWithChildren<Props> = Props & { children: Element<any>[] };

export const jsxs = <Props>(
    tagOrComponent: string | Component<Props> | typeof Fragment,
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
                throw new Error(`Invalid attribute value for ${key}: ${value}`);
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
        component: tagOrComponent,
        props,
        children: props.children || [],
    };
};
