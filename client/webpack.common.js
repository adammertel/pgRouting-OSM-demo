const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["node_modules", "src"],
  },
  mode: "development",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
