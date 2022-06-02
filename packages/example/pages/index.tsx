import * as Frostleaf from "@frostleaf/build-time";
import { Page } from "@frostleaf/build-time";

import Hello from "../components/Hello";
import World from "../components/World";

const IndexPage: Page = () => (
    <>
        <Hello />
        <World name="world" />
    </>
);

export default IndexPage;
