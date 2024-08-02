module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'local-rules'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    // 双引号
    'quotes': ['error', 'double'],
    // 禁止使用 var
    'no-var': 'error',
    // 禁止使用 debugger
    'no-debugger': 'error',
    // 禁止使用 console
    'no-console': 'error',
    // 禁止使用 alert
    'no-alert': 'error',
    // 标签中使用双引号
    'jsx-quotes': ['error', 'prefer-double'],
    // 不监听react深层依赖
    'react-hooks/exhaustive-deps': 'off',
    // map方法必须有返回值
    'local-rules/require-return-in-map': 'error',
    'array-callback-return': ['error', { allowImplicit: false }],
    // tab缩为2个空格
    'indent': ['error', 4]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['eslint-rules']
      }
    }
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'require-return-in-map': 'error',
      },
    }
  ]
}
