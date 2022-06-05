import {
    ComponentElement,
    Element,
    FHtmlElement,
    Fragment,
    FragmentElement,
} from "../../types";

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
): Promise<string> => {
    const { tag, attrs, children } = htmlElement;

    const attrFragments = Object.keys(attrs).map(
        (key) => `${key}="${attrs[key]}"`
    );
    const renderedAttrs =
        attrFragments.length != 0 ? ` ${attrFragments.join(" ")}` : "";

    if (voidElements.includes(tag)) {
        if (children.length != 0)
            throw new Error(`Void element ${tag} cannot have children`);
        return `<${tag}${renderedAttrs}>`;
    }

    if (children.length === 0) return `<${tag}${renderedAttrs}></${tag}>`;

    const renderedChildren = (await Promise.all(children.map(render))).join("");

    return `<${tag}${renderedAttrs}>${renderedChildren}</${tag}>`;
};

const renderComponentElement = async (
    componentElement: ComponentElement<Record<string, unknown>>
): Promise<string> => {
    const { component, props, children } = componentElement;
    const content = await component({ ...props, children });
    return await render(content);
};

const renderFragmentElement = async (fragment: FragmentElement) => {
    const { children } = fragment;
    return (await Promise.all(children.map(render))).join("");
};

export const render = async (
    element: Element<Record<string, unknown>>
): Promise<string> => {
    if (typeof element === "string") return element;

    if (element.type === "html-element")
        return await renderHtmlElement(element);

    if (element.type === Fragment) return await renderFragmentElement(element);

    return await renderComponentElement(element);
};
