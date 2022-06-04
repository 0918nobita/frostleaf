import arg from "arg";
import path from "path";

import { Brand } from "../../branded";

export type ProjectRoot = Brand<string, "projectRoot">;

export const get = <T extends arg.Spec>(args: arg.Result<T>) =>
    (args._.length >= 3
        ? path.resolve(args._[1])
        : process.cwd()) as ProjectRoot;
