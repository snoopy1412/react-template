const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const paths = require('./paths');

const publicPath = paths.servedPath;
const shouldUseRelativeAssetPaths = publicPath === './';
// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

exports.cssLoaders = (options) => {
  options = options || {}

  const cssLoader = {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
      minimize: process.env.NODE_ENV === 'production' ? true : false,
      sourceMap: process.env.NODE_ENV === 'production' ? options.sourceMap : true,
    }
  }

  const postcssLoader = {
    loader: require.resolve('postcss-loader'),
    options: {
    ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      sourceMap: process.env.NODE_ENV === 'production' ? options.sourceMap : true
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader, postcssLoader]

    if (loader) {
      loaders.push({
        loader: require.resolve(loader + '-loader'),
        options: Object.assign({}, loaderOptions, {
          sourceMap: process.env.NODE_ENV === 'production' ? options.sourceMap : true
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader',
        ...extractTextPluginOptions
      })
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    // less: generateLoaders('less'),
    scss: generateLoaders('sass'),
  }
}

exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}