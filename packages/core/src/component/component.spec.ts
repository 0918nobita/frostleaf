import { element } from ".";
import { render } from "./render";

describe("component", () => {
    test("htmlElement", async () => {
        const htmlElement = element("htmlElement", {
            tag: "p",
            attrs: {},
            children: [element("text", "Hello, world!")],
        });

        const result = await render(htmlElement);
        expect(result).toEqual(["<p>Hello, world!</p>", []]);
    });
});
