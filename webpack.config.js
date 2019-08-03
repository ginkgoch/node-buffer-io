const path = require('path');
module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index.ts'),
  target: "node",
  watch: false,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
    library: "ginkgoch-buffer-io",
    libraryTarget: "umd"
  },
  module: {
    rules: [{
      test: /.tsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts']
  },
  devtool: 'source-map'
};