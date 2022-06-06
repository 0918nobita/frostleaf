import { ADTValue, match, variant } from "./adt";

type AnyObj = Record<string, unknown>;

type ScriptPath = string;

type Component<Props> = (props: Props) => ComponentReturn;

type ComponentReturnADT = {
    tag: "ComponentReturn";
    variants: {
        element: [Element<AnyObj>];
        elementWithScripts: [Element<AnyObj>, ScriptPath[]];
        promiseElement: [Promise<Element<AnyObj>>];
        promiseElementWithScripts: [Promise<[Element<AnyObj>, ScriptPath[]]>];
    };
};

type ComponentReturn = ADTValue<ComponentReturnADT>;

export const componentReturn = variant<ComponentReturnADT>("ComponentReturn");

export const matchComponentReturn =
    match<ComponentReturnADT>("ComponentReturn");

type ElementADT<Props> = {
    tag: "Element";
    variants: {
        text: [string];
        htmlElement: [
            {
                tag: string;
                attrs: Record<string, string>;
                children: Element<AnyObj>[];
            }
        ];
        componentElement: [
            {
                component: Component<Props>;
                props: Props;
                children: Element<AnyObj>;
            }
        ];
        fragmentElement: [Element<AnyObj>[]];
    };
};

type Element<Props> = ADTValue<ElementADT<Props>>;

export const element = <Props>() => variant<ElementADT<Props>>("Element");

export const matchElement = <Props>() => match<ElementADT<Props>>("Element");
