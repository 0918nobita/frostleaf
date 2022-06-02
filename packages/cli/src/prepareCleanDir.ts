import fs from "fs/promises";
import path from "path";

const removeDir = async (dir: string): Promise<void> => {
    const files = await fs.readdir(dir);
    await Promise.all(
        files.map(async (file) => {
            const filePath = path.join(dir, file);
            const stat = await fs.stat(filePath);
            if (file === "." || file === "..") return;
            if (stat.isDirectory()) return await removeDir(filePath);
            return await fs.unlink(filePath);
        })
    );
    await fs.rmdir(dir);
};

export const prepareCleanDir = async (dir: string): Promise<void> => {
    try {
        await fs.stat(dir);
    } catch (e) {
        await fs.mkdir(dir, { recursive: true });
        return;
    }
    await removeDir(dir);
    await fs.mkdir(dir, { recursive: true });
};
