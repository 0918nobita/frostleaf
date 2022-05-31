import Frostleaf, { h } from "@frostleaf/framework";

export const Hello = Frostleaf.voidSync((_props) => h("p", {}, ["Hello"]));
