const path = require("path");

module.exports = {
  entry: ["@babel/polyfill", "./src/client/index.js"],
  output: {
    path: path.resolve(__dirname, "src", "public"),
    filename: "bundle.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  devtool: "source-map",
  watch: true,
};
