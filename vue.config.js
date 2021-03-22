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
  }
};
