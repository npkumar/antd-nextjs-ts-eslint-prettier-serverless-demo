// https://github.com/vercel/next.js/issues/11584
const withAntdLess = require('next-plugin-antd-less')
const { i18n } = require('./next-i18next.config')

module.exports = (phase, { defaultConfig }) =>
  withAntdLess({
    ...defaultConfig,
    lessVarsFilePath: './styles/antd-custom.less',
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/
        const origExternals = [...config.externals]
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback()
            if (typeof origExternals[0] === 'function') {
              origExternals[0](context, request, callback)
            } else {
              callback()
            }
          },
          ...(typeof origExternals[0] === 'function' ? [] : origExternals),
        ]

        config.module.rules.unshift({
          test: antStyles,
          use: 'null-loader',
        })
      }
      return config
    },
    i18n,
  })
