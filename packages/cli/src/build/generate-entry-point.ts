import fs from "fs/promises";
import path from "path";

import { getPageDefPaths } from "./page-src-import-map";
import { DestDir, EntryPointTs, PagesDir, ProjectRoot } from "./path";

type Args = {
    destDir: DestDir.DestDir;
    entryPointTs: EntryPointTs.EntryPointTs;
    projectRoot: ProjectRoot.ProjectRoot;
};

export const generateEntryPoint = async ({
    entryPointTs,
    destDir,
    projectRoot,
}: Args) => {
    const pagesDir = PagesDir.get(projectRoot);
    const pageSrcImportMap = await getPageDefPaths(pagesDir);

    console.log(`Generating ${path.relative(projectRoot, entryPointTs)} ...`);

    const content = pageSrcImportMap
        .map(([name, from]) => {
            const parsedPath = path.parse(path.relative(destDir, from));
            return `export * as ${name} from "${path.join(
                parsedPath.dir,
                parsedPath.name
            )}";\n`;
        })
        .join("");

    await fs.writeFile(entryPointTs, content);
};
