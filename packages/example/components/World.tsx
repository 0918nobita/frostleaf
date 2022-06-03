import { Component } from "@frostleaf/core";

type Props = {
    name: String;
};

const World: Component<Props> = async ({ name }: Props) => {
    return <p>{name}!</p>;
};

export default World;
