import {
    Element,
    ElementDesc,
    matchComponentReturn,
    matchElement,
    ScriptPath,
} from ".";

type AnyObj = Record<string, unknown>;

type Html = string;

export const render = async (
    element: Element<AnyObj>
): Promise<[Html, ScriptPath[]]> =>
    matchElement<Promise<[Html, ScriptPath[]]>>(element, {
        text: (text) => Promise.resolve([text, []]),

        htmlElement: renderHtmlElement,

        componentElement: renderComponentElement,

        fragmentElement: renderChildren,
    });

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
    element: ElementDesc<AnyObj>["htmlElement"]
): Promise<[Html, ScriptPath[]]> => {
    const { tag, attrs, children } = element;
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
    componentElement: ElementDesc<AnyObj>["componentElement"]
): Promise<[string, string[]]> => {
    const { component, props, children } = componentElement;

    const componentReturn = component({ ...props, children });

    return matchComponentReturn(componentReturn, {
        element: render,

        elementWithScripts: async ([element, scripts]) => {
            const [renderResult, childScripts] = await render(element);
            return [renderResult, [...scripts, ...childScripts]];
        },

        promiseElement: (element) => element.then(render),

        promiseElementWithScripts: async (promise) => {
            const [element, scripts] = await promise;
            const [renderResult, childScripts] = await render(element);
            return [renderResult, [...scripts, ...childScripts]];
        },
    });
};

const renderChildren = async (
    children: Element<AnyObj>[]
): Promise<[string, string[]]> => {
    const renderResults = await Promise.all(children.map(render));
    const renderedChildren = renderResults.map(([html]) => html).join("");
    const scripts = [
        ...new Set(renderResults.map(([, scripts]) => scripts).flat()),
    ];
    return [renderedChildren, scripts];
};
