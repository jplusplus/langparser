module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2,
            {
              "FunctionDeclaration": {
                "parameters": "first"
              },
              "VariableDeclarator": {
                "var": 2, "let": 2, "const": 3
              },
              "ignoredNodes": [
                "VariableDeclarator[init.type='CallExpression'][init.callee.name='require'] > ObjectPattern"
              ],
              "SwitchCase": 1,
            },
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
