import { Fragment, h } from "@frostleaf/framework";

import { Hello } from "../components/hello/build";
import { World } from "../components/world/build";

export const IndexPage = h(Fragment, {}, [
    h(Hello, {}, []),
    h(World, { name: "world" }, []),
]);
