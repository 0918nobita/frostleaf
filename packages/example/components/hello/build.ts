import Frostleaf, { h } from "@frostleaf/build-time";

export const Hello = Frostleaf.voidSync((_props) => h("p", {}, ["Hello"]));
