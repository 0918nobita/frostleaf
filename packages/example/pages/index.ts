import { h } from "@frostleaf/framework";

import hello from "../components/hello/build";
import world from "../components/world/build";

const IndexPage = h("div", {}, [
    h(hello, {}, []),
    h(world, { name: "world" }, []),
]);

export default IndexPage;
