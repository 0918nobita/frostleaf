import { Fragment, Page, h } from "@frostleaf/build-time";

import Hello from "../../components/Hello";
import World from "../../components/World";

export const DynamicPage: Page = ({ query }) =>
    h(Fragment, {}, [h(Hello, {}, []), h(World, { name: query.name! }, [])]);

export const getPaths = () => ({ paths: ["foo", "bar"] });

export default DynamicPage;
