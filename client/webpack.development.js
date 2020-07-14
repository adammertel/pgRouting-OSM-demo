const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const dotenv = require("dotenv-webpack");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    contentBase: "./build",
  },
  plugins: [
    new dotenv({
      path: "development.env",
      safe: true,
      systemvars: true,
    }),
  ],
});
