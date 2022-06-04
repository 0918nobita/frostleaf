import path from "path";

import { Brand } from "../../branded";
import { DestDir } from "./dest-dir";

export type BundleJs = Brand<string, "bundleJs">;

export const get = (destDir: DestDir) =>
    path.join(destDir, "bundle.js") as BundleJs;
