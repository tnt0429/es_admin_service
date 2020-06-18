module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaVersion: 6,//也就是ES6语法支持的意思
        ecmaFeatures: {
            modules: true
        },
        project: "./tsconfig.json"
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/max-attributes-per-line': [1, {
            'singleline': 10,
            'multiline': {
                'max': 10,
                'allowFirstLine': true
            }
        }],
        'indent': 'off',
        'vue/script-indent': [1, 4,
            {
                'baseIndent': 1
            }
        ],
        'vue/html-indent': [1, 4,
            {
                'baseIndent': 1
            }
        ],
        'vue/html-closing-bracket-spacing': [0, {
            'startTag': 'never',
            'endTag': 'never',
            'selfClosingTag': 'always'
        }]
    }
}
