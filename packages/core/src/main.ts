import { Element, element, matchElement, ScriptPath } from "./types";

type AnyObj = Record<string, unknown>;

type Html = string;

const render = async (
    element: Element<AnyObj>
): Promise<[Html, ScriptPath[]]> =>
    matchElement<AnyObj>()<Promise<[Html, ScriptPath[]]>>(element, {
        text: (text) => Promise.resolve([text, []]),
        htmlElement: () => {
            throw new Error("Not implemented");
        },
        componentElement: () => {
            throw new Error("Not implemented");
        },
        fragmentElement: () => {
            throw new Error("Not implemented");
        },
    });

const htmlElement = element()("text", "Hello, world!");

void render(htmlElement).then(console.log);
