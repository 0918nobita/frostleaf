import path from "path";

import Frostleaf, { h } from "@frostleaf/framework";

export const Hello = Frostleaf.voidSync(
    (_props) => h("p", {}, ["Hello"]),
    path.join(__dirname, "runtime.ts")
);
