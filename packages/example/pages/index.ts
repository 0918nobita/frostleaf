import { Component, Fragment, h } from "@frostleaf/build-time";

import Hello from "../components/Hello";
import World from "../components/World";

export const IndexPage: Component = () => h(Fragment, {}, [
    h(Hello, {}, []),
    h(World, { name: "world" }, []),
]);
