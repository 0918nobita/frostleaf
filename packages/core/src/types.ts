import { adt, genericADT, TypeOf } from "./adt";

type AnyObj = Record<string, unknown>;

export type ScriptPath = string;

type Component<Props> = (props: Props) => ComponentReturn;

type ComponentReturnDesc = {
    element: Element<AnyObj>;
    elementWithScripts: [Element<AnyObj>, ScriptPath[]];
    promiseElement: Promise<Element<AnyObj>>;
    promiseElementWithScripts: Promise<[Element<AnyObj>, ScriptPath[]]>;
};

export type ComponentReturn = TypeOf<ComponentReturnDesc>;

const componentReturnADT = adt<ComponentReturnDesc>();

export const componentReturn = componentReturnADT.variant;

export const matchComponentReturn = componentReturnADT.match;

type ElementDesc<Props> = {
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

declare module "./hkt" {
    interface HKT<T> {
        ElementDesc: ElementDesc<T>;
    }
}

export type Element<Props> = TypeOf<ElementDesc<Props>>;

const elementADT = genericADT("ElementDesc");

export const element = elementADT.makeVariantFn<AnyObj>();

export const matchElement = elementADT.makeMatchFn<AnyObj>();
