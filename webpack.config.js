var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
      base : ".\\src\\jsx\\apps\\base.jsx"
  },
  output: {
    filename: "[name]/index.js",
    path: "public"
  },
  module : {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ["es2015", "react"]
      }
    }],
  },
  plugins: [new HtmlWebpackPlugin({
      filename: "index.html",
      chunk : "base"
  })],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};
