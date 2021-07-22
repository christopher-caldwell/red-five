const { resolve } = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const nodeExternals = require('webpack-node-externals')

const rootPath = resolve(process.cwd())
const srcPath = resolve(rootPath, '/src')

const config = {
  mode: 'production',
  stats: 'minimal',
  context: rootPath,
  entry: srcPath,
  // externals: [nodeExternals()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src/')
    },
    extensions: ['.tsx', '.ts', '.json', '.js']
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  target: 'node',
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  }
}

if (process.env.ANALYZE) {
  config.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    })
  )
}

module.exports = config
