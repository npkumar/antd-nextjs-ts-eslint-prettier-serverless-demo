// https://github.com/vercel/next.js/issues/11584
const withAntdLess = require('next-plugin-antd-less');

module.exports = (phase, { defaultConfig }) => withAntdLess({
 ...defaultConfig,
  lessVarsFilePath: './styles/antd-custom.less',
});