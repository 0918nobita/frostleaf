import { Component, h } from "@frostleaf/build-time";

type Props = {
    name: String;
};

const World: Component<Props> = async ({ name }: Props) => {
    return h("p", {}, [`${name}!`]);
};

export default World;
