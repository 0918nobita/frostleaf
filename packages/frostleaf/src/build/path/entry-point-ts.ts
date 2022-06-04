import path from "path";

import { Brand } from "../../branded";
import { DestDir } from "./dest-dir";

export type EntryPointTs = Brand<string, "entryPointTs">;

export const get = (destDir: DestDir) =>
    path.join(destDir, "entry-point.ts") as EntryPointTs;
