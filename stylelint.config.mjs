/** @type {import('stylelint').Config} */
export default {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-less',
  ],
  overrides: [
    {
      customSyntax: 'postcss-html',
      files: ['*.(html|vue)', '**/*.(html|vue)'],
      rules: {},
    },
  ],
  plugins: ['@stylistic/stylelint-plugin', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'no-empty-source': null,
    "function-url-quotes": "never",
    "function-url-no-scheme-relative": true,
    "import-notation": "string", // 使用字符串形式导入
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global"]
      }
    ]
  },
};
