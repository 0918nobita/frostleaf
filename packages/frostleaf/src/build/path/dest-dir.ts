import path from "path";

import { Brand } from "../../branded";
import { ProjectRoot } from "./project-root";

export type DestDir = Brand<string, "destDir">;

export const get = (projectRoot: ProjectRoot) =>
    path.join(projectRoot, "_frostleaf") as DestDir;
