import { render } from "@frostleaf/build-time";

import { IndexPage } from "./pages/index";

console.log("Generating pages...");
render(IndexPage).then(console.log);
