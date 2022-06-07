import { adt, genericADT, TypeOf, TypeOf1 } from "./adt";

type AnyObj = Record<string, unknown>;

export type ScriptPath = string;

type Component<Props> = (props: Props) => ComponentReturn;

type ComponentReturnDesc = {
    element: Element<AnyObj>;
    elementWithScripts: [Element<AnyObj>, ScriptPath[]];
    promiseElement: Promise<Element<AnyObj>>;
    promiseElementWithScripts: Promise<[Element<AnyObj>, ScriptPath[]]>;
};

declare module "./adt" {
    interface Descriptor {
        ComponentReturn: ComponentReturnDesc;
    }

    interface Descriptor1<A> {
        ElementDesc: ElementDesc<A>;
    }
}

export type ComponentReturn = TypeOf<"ComponentReturn">;

const componentReturnADT = adt("ComponentReturn");

export const componentReturn = componentReturnADT.variant;

export const matchComponentReturn = componentReturnADT.match;

export type ElementDesc<Props> = {
    text: string;
    htmlElement: {
        tag: string;
        attrs: Record<string, string>;
        children: Element<AnyObj>[];
    };
    componentElement: {
        component: Component<Props>;
        props: Props;
        children: Element<AnyObj>;
    };
    fragmentElement: Element<AnyObj>[];
};

export type Element<Props> = TypeOf1<"ElementDesc", Props>;

const elementADT = genericADT("ElementDesc");

export const element = elementADT.makeVariantFn<AnyObj>();

export const matchElement = elementADT.makeMatchFn<AnyObj>();
