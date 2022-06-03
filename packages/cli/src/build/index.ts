import arg from "arg";
import { bundlePages } from "./bundle-pages";

import { generateEntryPoint } from "./generate-entry-point";
import { BundleJs, DestDir, EntryPointTs, ProjectRoot } from "./path";
import { prepareCleanDir } from "./prepare-clean-dir";
import { renderPages } from "./render-pages";

export const build = async <T extends arg.Spec>(
    validArgs: arg.Result<T>
): Promise<void> => {
    const projectRoot = ProjectRoot.get(validArgs);

    const destDir = DestDir.get(projectRoot);
    await prepareCleanDir(destDir);

    const entryPointTs = EntryPointTs.get(destDir);
    await generateEntryPoint({ entryPointTs, destDir, projectRoot });

    const bundleJs = BundleJs.get(destDir);
    await bundlePages({ bundleJs, entryPointTs });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pages = require(bundleJs) as { [_ in string]?: unknown };

    await renderPages({ destDir, pages });
};
