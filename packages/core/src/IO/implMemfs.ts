import { Volume } from "memfs/lib/volume";
import path from "path";

import { IO } from "./type";

export const ioMemfs =
    (vol: Volume): IO =>
    (dir: string) => ({
        readFile: (filename) =>
            vol.promises.readFile(
                path.join(dir, filename),
                "utf8"
            ) as Promise<string>,
        writeFile: (filename, content) =>
            vol.promises.writeFile(path.join(dir, filename), content),

        deleteFile: (filename) => vol.promises.unlink(path.join(dir, filename)),
        deleteAllFiles: () => vol.promises.rmdir(dir),
    });
