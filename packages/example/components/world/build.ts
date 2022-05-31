import Frostleaf, { h } from "@frostleaf/build-time";

type Props = {
    name: String;
};

export const World = Frostleaf.voidAsync<Props>(async ({ name }) => {
    return h("p", {}, [`${name}!`]);
});
