import {
    ComponentElement,
    Element,
    FHtmlElement,
    Fragment,
    FragmentElement,
} from "../../types";

const renderChildren = async (
    children: Element<any>[]
): Promise<[string, string[]]> => {
    const renderResults = await Promise.all(children.map(render));
    const renderedChildren = renderResults.map(([html]) => html).join("");
    const scripts = [
        ...new Set(renderResults.map(([, scripts]) => scripts).flat()),
    ];
    return [renderedChildren, scripts];
};

const voidElements: readonly string[] = [
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
];

const renderHtmlElement = async (
    htmlElement: FHtmlElement
): Promise<[string, string[]]> => {
    const { tag, attrs, children } = htmlElement;

    const attrFragments = Object.keys(attrs).map(
        (key) => `${key}="${attrs[key]}"`
    );
    const renderedAttrs =
        attrFragments.length != 0 ? ` ${attrFragments.join(" ")}` : "";

    if (voidElements.includes(tag)) {
        if (children.length != 0)
            throw new Error(`Void element ${tag} cannot have children`);
        return [`<${tag}${renderedAttrs}>`, []];
    }

    if (children.length === 0) return [`<${tag}${renderedAttrs}></${tag}>`, []];

    const [renderedChildren, scripts] = await renderChildren(children);
    return [`<${tag}${renderedAttrs}>${renderedChildren}</${tag}>`, scripts];
};

const renderComponentElement = async (
    componentElement: ComponentElement<Record<string, unknown>>
): Promise<[string, string[]]> => {
    const { component, props, children } = componentElement;
    const content = await component({ ...props, children });
    if (Array.isArray(content)) {
        const [element, scripts] = content;
        const [renderResult, childScripts] = await render(element);
        return [renderResult, [...scripts, ...childScripts]];
    }
    return await render(content);
};

const renderFragmentElement = async (
    fragment: FragmentElement
): Promise<[string, string[]]> => {
    const { children } = fragment;
    const renderResults = await Promise.all(children.map(render));
    const renderedChildren = renderResults.map(([html]) => html).join("");
    const scripts = [
        ...new Set(renderResults.map(([, scripts]) => scripts).flat()),
    ];
    return [renderedChildren, scripts];
};

export const render = async (
    element: Element<any>
): Promise<[string, string[]]> => {
    if (typeof element === "string") return [element, []];

    if (element.type === "html-element")
        return await renderHtmlElement(element);

    if (element.type === Fragment) return await renderFragmentElement(element);

    return await renderComponentElement(element);
};
