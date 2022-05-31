import { Fragment, h } from "@frostleaf/build-time";

import { Hello } from "../components/hello/build";
import { World } from "../components/world/build";

export const IndexPage = h(Fragment, {}, [
    h(Hello, {}, []),
    h(World, { name: "world" }, []),
]);
