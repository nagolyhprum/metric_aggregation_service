var HtmlWebpackPlugin = require("html-webpack-plugin");
var dir = __dirname + "\\src\\jsx\\";
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
        presets: ["es2015", "stage-0", "react"],
        env : {
          test : {
            plugins : ["istanbul"]
          }
        }
      }
    }, {
      test: /\.json$/,
      loader: "json-loader"
    }]
  },
  plugins: [new HtmlWebpackPlugin({
      filename: "index.html",
      chunk : "base"
  })],
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias : {
      reducers : dir + "reducers",
      utils : dir + "utils",
      components : dir + "components",
      actions : dir + "actions",
      apps : dir + "apps"
    }
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
