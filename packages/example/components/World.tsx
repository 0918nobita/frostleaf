import { Component, Element } from "frostleaf/types";

type Props = {
    name: string;
};

// eslint-disable-next-line @typescript-eslint/require-await
const World: Component<Props> = async ({ name }: Props): Promise<[Element<any>, string[]]> => {
    return [<p>{name}!</p>, ["./World.client.ts"]];
};

export default World;
