export default {
    "*.{js,ts,cjs,mjs,json,md}": "cspell --no-progress --no-must-find-files",
    "*.{js,ts,cjs,mjs}": "eslint --no-warn-ignored --max-warnings 0 --fix",
    "*": "prettier --write --ignore-unknown --log-level warn",
};
