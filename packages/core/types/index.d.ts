declare abstract class IElement {
    abstract Render(): Promise<string>;
}

declare class TextElement extends IElement {
    Render(): Promise<string>;
}

declare class HtmlElement extends IElement {
    Render(): Promise<string>;
}

declare class ComponentElement<Props> extends IElement {
    Render(): Promise<string>;
}

export const text: (content: string) => TextElement;

export const html: (
    tag: string,
    attrs: Map<string, string>,
    children: IElement[]
) => HtmlElement;

export const componentElement: <Props>(
    renderElement: (props: Props, children: IElement[]) => Promise<IElement>,
    props: Props,
    children: IElement[]
) => ComponentElement<Props>;
