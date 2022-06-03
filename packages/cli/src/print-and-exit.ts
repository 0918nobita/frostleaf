export const printAndExit = (msg: string, code = 1) => {
    console.error(msg);
    process.exit(code);
};
