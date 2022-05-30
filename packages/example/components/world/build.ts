import path from "path";

import { h, ComponentWithEffect } from "@frostleaf/framework";

const world: ComponentWithEffect<string> = {
    markupFn: async (content: string) => {
        return h("p", {}, [`${content}!`]);
    },
    script: path.join(path.dirname(__dirname), "runtime.ts"),
};

export default world;
