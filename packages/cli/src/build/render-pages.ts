import { Element, render } from "@frostleaf/build-time";
import fs from "fs/promises";
import path from "path";

import { DestDir, OutDir } from "./path";
import { prepareCleanDir } from "./prepare-clean-dir";

type Args = {
    destDir: DestDir.DestDir;
    pages: { [_ in string]?: unknown };
};

export const renderPages = async ({ destDir, pages }: Args) => {
    console.log("Rendering pages ...");

    const pageElements = await Promise.all(
        Object.entries(pages).flatMap(([pageName, content]: [string, any]) => {
            if ("default" in content) return [[pageName, content.default()]];
            return [];
        })
    );

    const renderResults = await Promise.all(
        pageElements.map(([pageName, element]) =>
            render(element as unknown as Element<any>).then((html) => [
                pageName,
                html,
            ])
        )
    );

    const outDir = OutDir.get(destDir);
    await prepareCleanDir(outDir);

    await Promise.all(
        renderResults.map(([pageName, html]) => {
            const pagePath = path.join(outDir, `${pageName}.html`);
            return fs.writeFile(
                pagePath,
                `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body>
${html}
</body>
</html>
`
            );
        })
    );
};
