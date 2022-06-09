export type IO = (dir: string) => {
    readFile: (filename: string) => Promise<string>;
    writeFile: (filename: string, content: string) => Promise<void>;

    deleteFile: (filename: string) => Promise<void>;
    deleteAllFiles: () => Promise<void>;
};
