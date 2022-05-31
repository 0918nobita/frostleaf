import path from "path";

import { h, VoidSyncComponent } from "@frostleaf/framework";

export const Hello: VoidSyncComponent = {
    type: "sync-component",

    resolveContent: (_props) => h("p", {}, ["Hello"]),

    runtimeScript: path.join(__dirname, "runtime.ts"),
};
