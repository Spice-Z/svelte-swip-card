const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: { main: "./src/main.js" },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    chunkFilename: "[name].[id].js"
  },
  devServer: {
    contentBase: 'dist',
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader","css-loader"]
      }
    ]
  },
  mode,
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "[name].css"
  //   })
  // ],
  devtool: prod ? false : "source-map"
};
