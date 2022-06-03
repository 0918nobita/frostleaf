import { Component } from "@frostleaf/core";

console.log("[Building] World component");

type Props = {
    name: String;
};

const World: Component<Props> = async ({ name }: Props) => {
    return <p>{name}!</p>;
};

export default World;
