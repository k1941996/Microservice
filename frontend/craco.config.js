/* eslint-disable no-undef */
const path = require("path");
module.exports = {
  webpack: {
    alias: {
      $api: path.resolve(__dirname, "./src/api"),
      $utils: path.resolve(__dirname, "./src/utils"),
      $pages: path.resolve(__dirname, "./src/pages"),
      $components: path.resolve(__dirname, "./src/components"),
      $authComponents: path.resolve(
        __dirname,
        "./src/components/authComponents"
      ),
      $routes: path.resolve(__dirname, "./src/routes"),
      $config: path.resolve(__dirname, "./src/config"),
      $redux: path.resolve(__dirname, "./src/Redux"),
      $inputComponents: path.resolve(
        __dirname,
        "./src/components/InputComponents"
      ),
      $assets: path.resolve(__dirname, "./src/assets"),
      $dispatchers: path.resolve(__dirname, "./src/Redux//Dispatchers"),
    },
  },
};
