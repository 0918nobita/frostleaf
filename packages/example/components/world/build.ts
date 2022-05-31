import path from "path";

import Frostleaf, { h } from "@frostleaf/framework";

type Props = {
    name: String;
};

export const World = Frostleaf.voidAsync<Props>(async ({ name }) => {
    return h("p", {}, [`${name}!`]);
}, path.join(__dirname, "build.ts"));
