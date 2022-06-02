import * as astring from "astring";
import * as estree from "estree";

import { ImportMap } from "./importMap";

const requireStatements = (
    importList: [string, string][]
): estree.VariableDeclaration[] =>
    importList.map(([name, from]) => ({
        type: "VariableDeclaration",
        kind: "const",
        declarations: [
            {
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
            },
        ],
    }));

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
    const requireStmts = requireStatements(importMap);
    const exportStmt = exportStatement(importMap.map(([name]) => name));

    const ast: estree.Program = {
        type: "Program",
        sourceType: "script",
        body: [...requireStmts, exportStmt],
    };

    return astring.generate(ast);
};
