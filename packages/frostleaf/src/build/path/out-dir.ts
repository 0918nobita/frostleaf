import path from "path";

import { Brand } from "../../branded";
import { DestDir } from "./dest-dir";

export type OutDir = Brand<string, "outDir">;

export const get = (destDir: DestDir) => path.join(destDir, "out") as OutDir;
