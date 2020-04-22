const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: [
          path.resolve(__dirname, 'node_modules/codemirror/lib/codemirror.css'),
          path.resolve(__dirname, 'node_modules/codemirror/theme/material.css'),
          path.resolve(
            __dirname,
            'node_modules/react-mde/lib/styles/css/react-mde-all.css'
          ),
        ],
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules/codemirror/lib/codemirror.css'),
          path.resolve(__dirname, 'node_modules/codemirror/theme/material.css'),
          path.resolve(
            __dirname,
            'node_modules/react-mde/lib/styles/css/react-mde-all.css'
          ),
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'layout-header-height': '48px',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.css'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Coding Blindspots',
      filename: 'index.html',
      inject: true,
      templateContent: ({ htmlWebpackPlugin }) => `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Coding Blindspots</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
            <div id="app"></div>
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = (env, argv) => {
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = '[name].[hash].js';
  }

  return config;
};
