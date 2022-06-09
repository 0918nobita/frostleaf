// 実行時バリデーション付きの ADT

import { z } from "zod";

export interface Schema {}

// 値コンストラクタ内部でバリデーションに使用するスキーマ
const schemaForVariant = {
    foo: z.number(),
    bar: z.string(),
};

// match 関数内部でバリデーションに使用するスキーマ
const schemaForMatch = z.discriminatedUnion("variant", [
    z.object({
        type: z.literal("MyType"),
        variant: z.literal("foo"),
        params: z.number(),
    }),
    z.object({
        type: z.literal("MyType"),
        variant: z.literal("bar"),
        params: z.string(),
    }),
]);

// 実行時にはこの型の値を扱う
type Res =
    | { type: "MyType"; variant: "foo"; params: number }
    | { type: "MyType"; variant: "bar"; params: string };
