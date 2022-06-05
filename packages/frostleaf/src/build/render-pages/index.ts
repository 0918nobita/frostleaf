import fs from "fs/promises";
import path from "path";

import { DestDir, OutDir } from "../path";
import { prepareCleanDir } from "../prepare-clean-dir";
import { Element, Page } from "../../types";
import { render } from "./render";

type PageDef = {
    default: Page;
};

// TODO: Implement stricter validation
const validatePageDef = (pageDef: unknown): pageDef is PageDef => {
    if (typeof pageDef !== "object") return false;
    if (pageDef === null) return false;
    if (!("default" in pageDef)) return false;
    if (typeof (pageDef as { default: unknown }).default !== "function")
        return false;
    if (
        "runtime" in pageDef &&
        typeof (pageDef as { runtime: unknown }).runtime !== "string"
    )
        return false;
    return true;
};

type Args = {
    destDir: DestDir.DestDir;
    pages: { [_ in string]: unknown };
};

export const renderPages = async ({ destDir, pages }: Args) => {
    console.log("Rendering pages ...");

    const pageElementPromises: Promise<
        [string, Element<any> | [Element<any>, string[]]]
    >[] = [];

    for (const page in pages) {
        const pageDef = pages[page];

        // TODO: Emit more useful error messages
        if (!validatePageDef(pageDef))
            throw new Error(`Invalid page definition: ${page}`);

        pageElementPromises.push(
            Promise.resolve(pageDef.default()).then((element) => [
                page,
                element,
            ])
        );
    }

    const pageElements = await Promise.all(pageElementPromises);

    const renderResults = await Promise.all(
        pageElements.map(([pageName, element]) => {
            if (Array.isArray(element)) {
                const [elem, scripts] = element;
                return render(elem).then(
                    ([html, childScripts]) =>
                        [pageName, html, [...childScripts, ...scripts]] as const
                );
            }
            return render(element).then(
                ([html, childScripts]) =>
                    [pageName, html, [...childScripts]] as const
            );
        })
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
