import { render } from "@frostleaf/framework";

import { IndexPage } from "./pages/index";

console.log("Generating pages...");
render(IndexPage).then(console.log);
