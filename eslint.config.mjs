// cspell:words eqeqeq, backreference, isnan, nonoctal, nonconstructor, typedefs

import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEsLintParser from "@typescript-eslint/parser";
import globals from "globals";

/*
    Rules in this file are in the same order as they appear in the docs sites to make it easy to find. (Usually this is alphabetical but sometimes there's subgroups.)
    ESLint Rule Documentation Sites:
        https://eslint.org/docs/latest/rules/
        https://typescript-eslint.io/rules/
*/

const baseRestrictedImports = {
    paths: [
        {
            name: ".",
            message: "Usage of local index imports is not allowed.",
        },
        {
            name: "./index",
            message: "Import from the source file instead.",
        },
    ],
};

export default [
    {
        linterOptions: {
            reportUnusedDisableDirectives: "warn",
            reportUnusedInlineConfigs: "warn",
        },
        languageOptions: {
            parser: typescriptEsLintParser,
            sourceType: "module",
            globals: {
                ...globals.es2025,
                ...globals.browser,
            },
        },
    },
    {
        ignores: ["**/dist/**"],
    },
    {
        files: ["**/*.ts", "**/*.cjs", "**/*.mjs", "**/*.ts", "**/*.cts", "**/*.mts"],
        rules: {
            // Possible Problems - https://eslint.org/docs/latest/rules/#possible-problems
            "array-callback-return": [
                "error",
                {
                    checkForEach: true,
                },
            ],
            "constructor-super": "error",
            "for-direction": "error",
            "getter-return": "error",
            "no-async-promise-executor": "error",
            "no-class-assign": "error",
            "no-compare-neg-zero": "error",
            "no-cond-assign": ["error", "always"],
            "no-const-assign": "error",
            "no-constant-binary-expression": "warn",
            "no-constant-condition": "error",
            "no-constructor-return": "error",
            "no-control-regex": "error",
            "no-debugger": "warn",
            "no-dupe-args": "error",
            "no-dupe-class-members": "error",
            "no-dupe-else-if": "error",
            "no-dupe-keys": "error",
            "no-duplicate-case": "error",
            "no-empty-character-class": "error",
            "no-empty-pattern": "error",
            "no-ex-assign": "error",
            "no-fallthrough": "error",
            "no-func-assign": "error",
            "no-import-assign": "error",
            "no-inner-declarations": ["error", "both"],
            "no-invalid-regexp": "error",
            "no-irregular-whitespace": [
                "error",
                {
                    skipStrings: false,
                    skipTemplates: false,
                    skipJSXText: false,
                },
            ],
            "no-loss-of-precision": "error",
            "no-misleading-character-class": "error",
            "no-new-native-nonconstructor": "error",
            "no-obj-calls": "error",
            "no-prototype-builtins": "error",
            "no-self-assign": "warn",
            "no-self-compare": "warn",
            "no-setter-return": "error",
            "no-sparse-arrays": "error",
            "no-template-curly-in-string": "error",
            "no-this-before-super": "error",
            "no-undef": "error",
            "no-unexpected-multiline": "error",
            "no-unmodified-loop-condition": "error",
            "no-unreachable": "warn",
            "no-unsafe-finally": "error",
            "no-unsafe-negation": [
                "error",
                {
                    enforceForOrderingRelations: true,
                },
            ],
            "no-unsafe-optional-chaining": [
                "error",
                {
                    disallowArithmeticOperators: true,
                },
            ],
            "no-unused-private-class-members": "warn",
            "no-unused-vars": [
                "warn",
                {
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                    reportUsedIgnorePattern: true,
                },
            ],
            "no-use-before-define": [
                "warn",
                {
                    functions: false,
                    classes: false,
                    variables: true,
                    allowNamedExports: false,
                },
            ],
            "no-useless-backreference": "error",
            "use-isnan": "error",
            "valid-typeof": "error",
            // Suggestions - https://eslint.org/docs/latest/rules/#suggestions
            "consistent-return": "error",
            curly: "warn",
            "default-param-last": "error",
            eqeqeq: "error",
            "func-names": ["warn", "never"],
            "func-style": ["warn", "declaration"],
            "no-array-constructor": "error",
            "no-bitwise": "error",
            "no-case-declarations": "error",
            "no-delete-var": "error",
            "no-else-return": "warn",
            "no-empty": "warn",
            "no-empty-function": "warn",
            "no-empty-static-block": "warn",
            "no-eval": "error",
            "no-extend-native": "error",
            "no-extra-bind": "error",
            "no-extra-boolean-cast": [
                "warn",
                {
                    enforceForLogicalOperands: true,
                },
            ],
            "no-global-assign": "error",
            "no-implicit-coercion": "error",
            "no-implicit-globals": "error",
            "no-implied-eval": "error",
            "no-invalid-this": [
                "error",
                {
                    capIsConstructor: false,
                },
            ],
            "no-labels": "error",
            "no-lone-blocks": "error",
            "no-multi-assign": "warn",
            "no-new": "error",
            "no-new-func": "error",
            "no-new-wrappers": "error",
            "no-nonoctal-decimal-escape": "error",
            "no-object-constructor": "error",
            "no-octal": "error",
            "no-octal-escape": "error",
            "no-proto": "error",
            "no-redeclare": "error",
            "no-regex-spaces": "warn",
            "no-restricted-imports": ["warn", baseRestrictedImports],
            "no-restricted-syntax": [
                "warn",
                {
                    selector: "CallExpression[callee.name='Number']",
                    message: "Don't use the Number function. Use parseInt or parseFloat instead.",
                },
                {
                    selector: "CallExpression[callee.name='Boolean']",
                    message: "Don't use the Boolean function. Use a strict comparison instead.",
                },
                {
                    selector: "TSEnumDeclaration",
                    message: "Use a type with a union of strings instead.",
                },
                {
                    selector: "TSTypeReference Identifier[name='React']",
                    message: "Import the type explicitly instead of using the React global.",
                },
                {
                    selector: "TSTypeReference Identifier[name='PropsWithChildren']",
                    message: "Explicitly declare children in your props type.",
                },
            ],
            "no-return-assign": ["warn", "always"],
            "no-script-url": "error",
            "no-sequences": [
                "warn",
                {
                    allowInParentheses: false,
                },
            ],
            "no-shadow": [
                "error",
                {
                    ignoreOnInitialization: true,
                },
            ],
            "no-shadow-restricted-names": "error",
            "no-throw-literal": "error",
            "no-unused-expressions": [
                "warn",
                {
                    enforceForJSX: true,
                },
            ],
            "no-useless-call": "error",
            "no-useless-catch": "warn",
            "no-useless-computed-key": [
                "warn",
                {
                    enforceForClassMembers: true,
                },
            ],
            "no-useless-concat": "error",
            "no-useless-escape": "warn",
            "no-useless-rename": "warn",
            "no-useless-return": "warn",
            "no-var": "error",
            "no-with": "error",
            "one-var": ["warn", "never"],
            "operator-assignment": "warn",
            "prefer-arrow-callback": "warn",
            "prefer-const": "warn",
            "prefer-numeric-literals": "warn",
            "prefer-object-spread": "warn",
            "prefer-promise-reject-errors": "error",
            "prefer-rest-params": "warn",
            "prefer-spread": "warn",
            "prefer-template": "warn",
            radix: "error",
            "require-await": "error",
            "require-yield": "error",
            // Layout & Formatting - https://eslint.org/docs/latest/rules/#layout--formatting
            // ---- Nothing in this category. Defer to Prettier. ----
        },
    },
    {
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
            },
        },
        files: ["**/*.ts", "**/*.cts", "**/*.mts"],
        plugins: {
            "@typescript-eslint": typescriptPlugin,
        },
        rules: {
            // TypeScript ESLint Core Disables - https://typescript-eslint.io/docs/linting/configs#eslint-recommended
            "constructor-super": "off",
            "getter-return": "off",
            "no-class-assign": "off",
            "no-const-assign": "off",
            "no-dupe-args": "off",
            "no-dupe-keys": "off",
            "no-func-assign": "off",
            "no-import-assign": "off",
            "no-new-native-nonconstructor": "off",
            "no-obj-calls": "off",
            "no-setter-return": "off",
            "no-this-before-super": "off",
            "no-undef": "off",
            "no-unreachable": "off",
            "no-unsafe-negation": "off",
            "valid-typeof": "off",
            // TypeScript - https://typescript-eslint.io/rules/
            "@typescript-eslint/adjacent-overload-signatures": "error",
            "@typescript-eslint/array-type": "warn",
            "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/ban-ts-comment": "error",
            "@typescript-eslint/consistent-generic-constructors": ["warn", "constructor"],
            "@typescript-eslint/consistent-type-assertions": [
                "warn",
                {
                    assertionStyle: "as",
                    objectLiteralTypeAssertions: "allow-as-parameter",
                },
            ],
            "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
            "@typescript-eslint/consistent-type-exports": "error",
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                {
                    fixStyle: "inline-type-imports",
                },
            ],
            "@typescript-eslint/explicit-function-return-type": [
                "error",
                {
                    allowTypedFunctionExpressions: true,
                },
            ],
            "@typescript-eslint/explicit-member-accessibility": "warn",
            "@typescript-eslint/method-signature-style": "warn",
            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: [
                        "classProperty",
                        "objectLiteralProperty",
                        "typeProperty",
                        "classMethod",
                        "objectLiteralMethod",
                        "typeMethod",
                        "accessor",
                        "enumMember",
                    ],
                    format: null,
                    modifiers: ["requiresQuotes"],
                },
                {
                    selector: "default",
                    format: ["camelCase"],
                },
                {
                    selector: "import",
                    format: ["camelCase", "PascalCase"],
                },
                {
                    selector: ["function", "method", "enumMember", "property"],
                    format: ["camelCase", "PascalCase"],
                },
                {
                    selector: "parameter",
                    format: ["camelCase"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: "variable",
                    modifiers: ["const"],
                    format: ["camelCase", "PascalCase", "UPPER_CASE"],
                    leadingUnderscore: "allow",
                },
                {
                    selector: "typeLike",
                    format: ["PascalCase"],
                },
                {
                    selector: "typeProperty",
                    format: ["camelCase", "PascalCase", "UPPER_CASE"],
                },
            ],
            "@typescript-eslint/no-array-delete": "error",
            "@typescript-eslint/no-base-to-string": "error",
            "@typescript-eslint/no-confusing-non-null-assertion": "error",
            "@typescript-eslint/no-confusing-void-expression": [
                "error",
                {
                    ignoreVoidReturningFunctions: true,
                },
            ],
            "@typescript-eslint/no-deprecated": "warn",
            "@typescript-eslint/no-duplicate-type-constituents": "warn",
            "@typescript-eslint/no-empty-interface": "warn",
            "@typescript-eslint/no-empty-object-type": "warn",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-extra-non-null-assertion": "error",
            "@typescript-eslint/no-extraneous-class": "error",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-for-in-array": "error",
            "@typescript-eslint/no-inferrable-types": "warn",
            "@typescript-eslint/no-invalid-void-type": "error",
            "@typescript-eslint/no-meaningless-void-operator": "warn",
            "@typescript-eslint/no-misused-new": "error",
            "@typescript-eslint/no-misused-promises": "error",
            "@typescript-eslint/no-misused-spread": "error",
            "@typescript-eslint/no-namespace": "warn",
            "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "warn",
            "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
            "@typescript-eslint/no-redundant-type-constituents": "warn",
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-this-alias": "warn",
            "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",
            "@typescript-eslint/no-unnecessary-condition": [
                "warn",
                {
                    checkTypePredicates: true,
                },
            ],
            "@typescript-eslint/no-unnecessary-qualifier": "warn",
            "@typescript-eslint/no-unnecessary-template-expression": "warn",
            "@typescript-eslint/no-unnecessary-type-arguments": "warn",
            "@typescript-eslint/no-unnecessary-type-assertion": "warn",
            "@typescript-eslint/no-unnecessary-type-constraint": "warn",
            "@typescript-eslint/no-unsafe-argument": "error",
            "@typescript-eslint/no-unsafe-assignment": "error",
            "@typescript-eslint/no-unsafe-call": "error",
            "@typescript-eslint/no-unsafe-enum-comparison": "warn",
            "@typescript-eslint/no-unsafe-function-type": "error",
            "@typescript-eslint/no-unsafe-declaration-merging": "error",
            "@typescript-eslint/no-unsafe-member-access": "error",
            "@typescript-eslint/no-unsafe-return": "error",
            "@typescript-eslint/no-unsafe-unary-minus": "error",
            "@typescript-eslint/no-useless-empty-export": "warn",
            "@typescript-eslint/no-var-requires": "error",
            "@typescript-eslint/no-wrapper-object-types": "error",
            "@typescript-eslint/non-nullable-type-assertion-style": "warn",
            "@typescript-eslint/parameter-properties": "error",
            "@typescript-eslint/prefer-as-const": "warn",
            "@typescript-eslint/prefer-find": "warn",
            "@typescript-eslint/prefer-for-of": "warn",
            "@typescript-eslint/prefer-includes": "warn",
            "@typescript-eslint/prefer-namespace-keyword": "warn",
            "@typescript-eslint/prefer-nullish-coalescing": [
                "warn",
                {
                    ignoreTernaryTests: false,
                },
            ],
            "@typescript-eslint/prefer-optional-chain": "warn",
            "@typescript-eslint/prefer-readonly": "warn",
            "@typescript-eslint/prefer-reduce-type-parameter": "warn",
            "@typescript-eslint/prefer-return-this-type": "error",
            "@typescript-eslint/prefer-string-starts-ends-with": "warn",
            "@typescript-eslint/prefer-ts-expect-error": "warn",
            "@typescript-eslint/related-getter-setter-pairs": "error",
            "@typescript-eslint/require-array-sort-compare": "error",
            "@typescript-eslint/restrict-plus-operands": "error",
            "@typescript-eslint/restrict-template-expressions": "error",
            "@typescript-eslint/strict-boolean-expressions": [
                "error",
                {
                    allowString: false,
                    allowNumber: false,
                    allowNullableObject: false,
                    allowNullableEnum: false,
                },
            ],
            "@typescript-eslint/switch-exhaustiveness-check": "error",
            "@typescript-eslint/triple-slash-reference": "warn",
            "@typescript-eslint/unbound-method": "error",
            "@typescript-eslint/unified-signatures": "warn",
            "@typescript-eslint/use-unknown-in-catch-callback-variable": "warn",
            // TypeScript Extension Rules - https://typescript-eslint.io/rules/#extension-rules
            "consistent-return": "off",
            "@typescript-eslint/consistent-return": "error",
            "default-param-last": "off",
            "@typescript-eslint/default-param-last": "error",
            "prefer-promise-reject-errors": "off",
            "@typescript-eslint/prefer-promise-reject-errors": "error",
            "no-array-constructor": "off",
            "@typescript-eslint/no-array-constructor": "error",
            "no-dupe-class-members": "off",
            "no-empty-function": "off",
            "@typescript-eslint/no-empty-function": "warn",
            "no-implied-eval": "off",
            "@typescript-eslint/no-implied-eval": "error",
            "no-invalid-this": "off",
            "no-redeclare": "off",
            "@typescript-eslint/no-redeclare": [
                "error",
                {
                    ignoreDeclarationMerge: false,
                },
            ],
            "no-shadow": "off",
            "@typescript-eslint/no-shadow": [
                "error",
                {
                    ignoreOnInitialization: true,
                },
            ],
            "no-throw-literal": "off",
            "@typescript-eslint/only-throw-error": [
                "error",
                {
                    allowThrowingAny: false,
                    allowThrowingUnknown: false,
                },
            ],
            "no-unused-expressions": "off",
            "@typescript-eslint/no-unused-expressions": [
                "warn",
                {
                    enforceForJSX: true,
                },
            ],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                    reportUsedIgnorePattern: true,
                },
            ],
            "no-use-before-define": "off",
            "@typescript-eslint/no-use-before-define": [
                "warn",
                {
                    functions: false,
                    classes: false,
                    variables: true,
                    allowNamedExports: false,
                    // TS extension options
                    enums: true,
                    typedefs: true,
                    ignoreTypeReferences: true,
                },
            ],
            "require-await": "off",
            "@typescript-eslint/require-await": "error",
        },
    },
];
