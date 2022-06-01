import { Fragment, Page, h } from "@frostleaf/build-time";

import Hello from "../components/Hello";
import World from "../components/World";

const IndexPage: Page = () => h(Fragment, {}, [
    h(Hello, {}, []),
    h(World, { name: "world" }, []),
]);

export default IndexPage;
