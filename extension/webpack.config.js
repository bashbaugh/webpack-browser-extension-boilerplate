const webpack = require("webpack"),
  path = require("path"),
  fs = require("fs"),
  CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin,
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  DotenvPlugin = require('dotenv-webpack')

const devMode = process.env.NODE_ENV !== "production"
const browser = (process.env.TARGET_BROWSER || 'chrome').toString()

// A mapping of browser names to browser APIs
const browserApiName = {
  'chrome': 'chrome',
  'firefox': 'browser',
  'edge': 'chrome'
}[browser] || 'chrome'


const options = {
  mode: devMode ? 'development' : 'production',
  entry: {
    popup: './src/popup/index.js',
    background: './src/background/index.js',
    content: './src/content/index.js',
    staticPage: './src/pages/page.js'
  },
  output: {
    path: path.resolve('build'),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                "targets": {
                  "chrome": "80",
                  "firefox": "70",
                  "edge": "80"
                }
              }
            ]
          ],
          plugins: [[
              "@babel/plugin-proposal-class-properties"
          ]]
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: new RegExp('.(' + ["jpg", "jpeg", "png", "gif", "svg"].join('|') + ')$'),
        use: "file-loader?name=[name].[ext]",
        exclude: /node_modules|icons/
      },
      {
        test: /\.html$/,
        use: "html-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      firebaseConfig: path.join(__dirname, "firebaseConfig.json") // Path to file that contains firebase config object (delete this if you aren't using firebase)
    }
  },
  externals: {
    browserApi: browserApiName // This lets us import the browser api (browser, chrome, etc.)
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      'NODE_ENV': 'development',
      'TARGET': browser
    }),
    new DotenvPlugin({
      path: './.env',
      safe: true
    }),
    new CopyWebpackPlugin({
      // If you need to dynamically modify manifest.json (for example to auto-increment the version, perhaps?) do it with CopyWebpackPlugin
      patterns: [{
        from: './manifest.json',
        to: 'manifest.json'
      }, {
        from: '../LICENSE',
        to: 'LICENSE.txt'
      }, {
        from: './icons',
        to: 'icons'
      }, {
        from: './fonts',
        to: 'fonts'
      }]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/popup/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false // Needed to ensure that HTML files are regenerated in watch mode for some reason
    }),
    new HtmlWebpackPlugin({
      template: 'src/background/background.html',
      filename: 'background.html',
      chunks: ['background'],
      cache: false
    }),
    ...generateStaticPageHtmlPlugins()
  ]
}

// Returns an array of HTMLWebpackPlugins for each of HTML templates in src/pages, using the staticPage js chunk
function generateStaticPageHtmlPlugins () {
  const templateFiles = fs.readdirSync(path.resolve('./src/pages/'))
  return templateFiles
    .filter(item => item.endsWith('.html'))
    .map(item => {
      console.log(item)
      const name = item.split('.')[0]
      return new HtmlWebpackPlugin({
        template: `src/pages/${name}.html`,
        filename: `page/${name}.html`,
        chunks: ['staticPage'],
        cache: false
      })
    })
}

// Add dev-mode-only and production-only settings
if (devMode) {
  options.devtool = "eval-cheap-module-source-map"
  options.watchOptions = {
    ignored: /node_modules/
  }
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      '...', // This tells webpack to still include the default js minimizer
      new CssMinimizerPlugin(),
    ],
  }
  options.plugins.push(new webpack.BannerPlugin({
    // Usually this should be a 1-line message telling where to find the license and any other info. It will be added to the top of the license file of each bundle.
    banner: `LICENSE MESSAGE HERE` 
  }))
}

module.exports = options
