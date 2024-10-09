module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parser: 'vue-eslint-parser',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0, // 忽略空格
    semi: ['error', 'never'], // 无分号
    'vue/script-indent': [ // script区域缩进俩格
      'error',
      2,
      {
        // script标签缩进设置
        baseIndent: 1,
        switchCase: 0,
        ignores: []
      }
    ],
    quotes: ['error', 'single'], // 强制使用单引号
    indent: 'off',
    camelcase: 0, // 忽略强制驼峰命名
    'no-trailing-spaces': 0, // 忽略语句后面出现的空格
    'no-mixed-spaces-and-tabs': 0,
    'no-tabs': 'off',
    'no-use-before-define': 'off',
    // 关闭名称校验
    'vue/multi-word-component-names': 'off'
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        indent: "off"
      }
    }
  ]
}
