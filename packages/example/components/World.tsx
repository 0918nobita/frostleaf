import * as Frostleaf from "@frostleaf/build-time";
import { Component } from "@frostleaf/build-time";

console.log("[Building] World component");

type Props = {
    name: String;
};

const World: Component<Props> = async ({ name }: Props) => {
    return <p>{name}!</p>;
};

export default World;
