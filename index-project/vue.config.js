const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.externals({
      "BMap": "BMap"
    });
  },
  devServer: {
    disableHostCheck: true,
    port: 8082
  }
})
