import path from "path";

import { Brand } from "../../branded";
import { ProjectRoot } from "./project-root";

export type PagesDir = Brand<string, "pagesDir">;

export const get = (projectRoot: ProjectRoot) =>
    path.join(projectRoot, "pages") as PagesDir;
