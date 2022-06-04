import { Component } from "@frostleaf/core";

type Props = {
    name: string;
};

// eslint-disable-next-line @typescript-eslint/require-await
const World: Component<Props> = async ({ name }: Props) => {
    return <p>{name}!</p>;
};

export default World;
