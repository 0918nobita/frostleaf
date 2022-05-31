import path from "path";

import { h, SyncComponent } from "@frostleaf/framework";

const hello: SyncComponent = {
    type: "sync-component",
    resolveContent: (_props) => h("p", {}, []),
    runtimeScript: path.join(__dirname, "runtime.ts"),
};

export default hello;
