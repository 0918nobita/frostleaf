import fs from "fs/promises";
import path from "path";

import { IO } from "./type";

export const ioFs: IO = (dir: string) => ({
    readFile: (filename) => fs.readFile(path.join(dir, filename), "utf8"),
    writeFile: (filename, content) =>
        fs.writeFile(path.join(dir, filename), content),

    deleteFile: (filename) => fs.unlink(path.join(dir, filename)),
    deleteAllFiles: () => fs.rmdir(dir, { recursive: true }),
});
