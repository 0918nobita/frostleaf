import type { Stats } from "fs";
import fs from "fs/promises";
import path from "path";

import { Brand } from "../branded";
import { ImportMap } from "./import-map";
import { PagesDir } from "./path/pages-dir";

export type PageSrcImportMap = Brand<ImportMap, "pageSrc">;

export const getPageDefPaths = async (
    pagesDir: PagesDir
): Promise<PageSrcImportMap> => {
    let stat: Stats;
    try {
        stat = await fs.stat(pagesDir);
    } catch (e) {
        return [] as unknown as PageSrcImportMap;
    }
    if (!stat.isDirectory())
        throw new Error(`components directory must be folder`);
    try {
        const files = await fs.readdir(pagesDir);
        return files
            .filter((p) => p.endsWith(".ts") || p.endsWith(".tsx"))
            .map((p) => [
                path.parse(p).name,
                path.join(pagesDir, p),
            ]) as PageSrcImportMap;
    } catch (e) {
        throw new Error("Failed to read components directory");
    }
};
