import { Page } from "frostleaf/types";

import Hello from "../components/Hello";
import World from "../components/World";

const IndexPage: Page = () => (
    <>
        <Hello />
        <World name="world" />
    </>
);

export default IndexPage;
