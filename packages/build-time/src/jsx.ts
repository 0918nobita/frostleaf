import { h } from "./h";
import { Component, Element } from "./types";

type Props = {
    [_ in string]?: unknown;
};

export const createElement = (
    tagOrComponent: string | Component<any>,
    props: Props | null,
    ...children: Element<any>[]
): Element<any> => h(tagOrComponent, props === null ? {} : props, children);
