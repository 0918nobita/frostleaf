import { ComponentElement, Element, FHtmlElement } from "./types";

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
    componentElement: ComponentElement<any>
): Promise<string> => {
    const { component, props, children } = componentElement;

    if (component.type === "sync-component") {
        const content = component.resolveContent({ ...props, children });
        return await render(content);
    }

    const content = await component.resolveContent({ ...props, children });
    return await render(content);
};

export const render = async (element: Element<any>): Promise<string> => {
    if (typeof element === "string") return element;

    if (element.type === "html-element")
        return await renderHtmlElement(element);

    return await renderComponentElement(element);
};
