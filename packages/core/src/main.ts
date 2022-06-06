import { componentReturn, element } from "./types";

const foo = componentReturn(
    "element",
    element()("htmlElement", {
        tag: "p",
        attrs: {},
        children: [element()("text", "Hello, world!")],
    })
);

console.dir(foo, { depth: null });
