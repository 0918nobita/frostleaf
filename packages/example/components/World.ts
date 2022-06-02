import { Component, h } from "@frostleaf/build-time";

console.log("[Building] World component");

type Props = {
    name: String;
};

const World: Component<Props> = async ({ name }: Props) => {
    return h("p", {}, [`${name}!`]);
};

export default World;
