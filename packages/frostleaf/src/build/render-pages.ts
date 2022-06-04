import { Element, render } from "../core";
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.entries(pages).flatMap(([pageName, content]: [string, any]) => {
            if ("default" in content)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                return [[pageName, content.default()]] as const;
            return [];
        })
    );

    const renderResults = await Promise.all(
        pageElements.map(([pageName, element]) =>
            render(element as unknown as Element<Record<string, unknown>>).then(
                (html) => [pageName, html] as const
            )
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
