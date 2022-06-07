import { render } from "./render";
import { element } from "./types";

const htmlElement = element("htmlElement", {
    tag: "p",
    attrs: {},
    children: [element("text", "Hello, world!")],
});

void render(htmlElement).then(console.log);
