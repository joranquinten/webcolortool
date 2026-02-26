module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.electron.webcolortool",
        productName: "WebColorTool",
        win: {
          target: [
            {
              target: "msi",
              arch: ["x64", "ia32"]
            },
            {
              target: "portable",
              arch: ["x64", "ia32"]
            }
          ],
          icon: "./public/favicon.ico"
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use 'vuetify' as *;\n`,
        implementation: require('sass')
      }
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      });
      return definitions;
    });
  }
};
