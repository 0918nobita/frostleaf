import { Volume } from "memfs";

import { ioMemfs } from "./impl-memfs";

describe("IO", () => {
    test("memfs", async () => {
        const io = ioMemfs(new Volume());
        const dir = io("/");
        await dir.writeFile("example.txt", "hello");
        const content = await dir.readFile("example.txt");
        expect(content).toBe("hello");
    });
});
