import { Page } from "@frostleaf/core";

import Hello from "../components/Hello";
import World from "../components/World";

const IndexPage: Page = () => (
    <>
        <Hello />
        <World name="world" />
    </>
);

export default IndexPage;
