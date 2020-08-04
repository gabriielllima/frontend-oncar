var path = require("path");
module.exports = {
  entry: {
    bundle: [path.resolve(__dirname, "src")],
    service: [path.resolve(__dirname, "src", "service.js")],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  devServer: {
    contentBase: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: "source-map",
};
