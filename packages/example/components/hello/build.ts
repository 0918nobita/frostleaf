import path from "path";

import { h, StaticComponent } from "@frostleaf/framework";

const hello: StaticComponent = {
    markup: h("p", {}, []),
    script: path.join(path.dirname(__dirname), "runtime.ts"),
};

export default hello;
