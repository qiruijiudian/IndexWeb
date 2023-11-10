const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.externals({
      "BMap": "BMap"
    });
  },
  devServer: {
    port: 8082
  }
})
