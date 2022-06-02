import { Component, h } from "@frostleaf/build-time";

console.log("[Building] Hello component");

const Hello: Component = () => h("p", {}, ["Hello"]);

export default Hello;
