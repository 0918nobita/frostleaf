import path from "path";

import { h, VoidAsyncComponent } from "@frostleaf/framework";

type Props = {
    name: String;
};

export const World: VoidAsyncComponent<Props> = {
    type: "async-component",

    resolveContent: async ({ name }) => {
        return h("p", {}, [`${name}!`]);
    },

    runtimeScript: path.join(__dirname, "runtime.ts"),
};
