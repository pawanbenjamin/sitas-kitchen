const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "client", "index"),
  output: {
    path: path.resolve(__dirname, "src", "public"),
    filename: "bundle.js",
  },
  mode: "development",
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
