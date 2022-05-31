import path from "path";

import { h, AsyncComponent } from "@frostleaf/framework";

type Props = {
    name: String;
};

const world: AsyncComponent<Props> = {
    type: "async-component",
    resolveContent: async ({ name }) => {
        return h("p", {}, [`${name}!`]);
    },
    runtimeScript: path.join(__dirname, "runtime.ts"),
};

export default world;
