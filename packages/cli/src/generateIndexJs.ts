import * as astring from "astring";
import * as estree from "estree";

import { ImportMap } from "./importMap";

const requireStatement = (
    importList: [string, string][]
): estree.VariableDeclaration => ({
    type: "VariableDeclaration",
    kind: "const",
    declarations: importList.map(([name, from]) => ({
        type: "VariableDeclarator",
        id: {
            type: "Identifier",
            name,
        },
        init: {
            type: "CallExpression",
            optional: false,
            callee: {
                type: "Identifier",
                name: "require",
            },
            arguments: [
                {
                    type: "Literal",
                    value: from,
                },
            ],
        },
    })),
});

const exportStatement = (names: string[]): estree.ExpressionStatement => ({
    type: "ExpressionStatement",
    expression: {
        type: "AssignmentExpression",
        operator: "=",
        left: {
            computed: false,
            optional: false,
            type: "MemberExpression",
            object: {
                type: "Identifier",
                name: "module",
            },
            property: {
                type: "Identifier",
                name: "exports",
            },
        },
        right: {
            type: "ObjectExpression",
            properties: names.map((name) => ({
                type: "Property",
                shorthand: true,
                method: false,
                computed: false,
                kind: "init",
                key: { type: "Identifier", name },
                value: { type: "Identifier", name },
            })),
        },
    },
});

export const generateIndexJs = (importMap: ImportMap): string => {
    const requireStmt = requireStatement(importMap);
    const exportStmt = exportStatement(importMap.map(([name]) => name));
    const ast: estree.Program = {
        type: "Program",
        sourceType: "script",
        body: [requireStmt, exportStmt],
    };
    return astring.generate(ast);
};
