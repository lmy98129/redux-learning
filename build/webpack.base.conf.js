const path = require('path');
const APP_PATH = path.resolve(__dirname, '../app');
const DIST_PATH = path.resolve(__dirname, '../public');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './app/index.js',
    framework: ['react', 'react-dom'],
  },
  output: {
    filename: 'js/bundle.js',
    path: DIST_PATH,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        include: APP_PATH,
        loader: "babel-loader",
        query: {
          compact: true,
          presets: [
            [
              "es2015", { "modules": false }
            ],
            "stage-0",
            "react",
          ],
          cacheDirectory: true,
          plugins: [
            ["import", { libraryName: "antd-mobile", style: "css"}],
            ["import", { libraryName: "antd-mobile", libraryDirectory: "lib"}, "antd-mobile"],
            "transform-runtime",
          ]
        }
      },
      /*{
        test: /\.html$/,
        loader: 'html-withimg-loader' // html-loader 功能一样
      },*/
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader" //html-loader 虽然解决了图片解析问题，但又使原本支持的 模板变量解析 功能丧失
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"//获取引用资源，如@import,url()
            },
            {
              loader: "postcss-loader"
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader"//自动加前缀
            },
            {
              loader: "less-loader"
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].[hash].css'),
    new CopyWebpackPlugin([
      {
          from: 'template/manifest.json',
          to: 'manifest.json'
      },
      {
          from: 'template/icon.png',
          to: 'icon.png'
      }
    ]),
    new OfflinePlugin({
      responseStrategy: 'cache-first', // 缓存优先
      AppCache: false,                 // 不启用appCache
      safeToUseOptionalCaches: true,   // Removes warning for about `additional` section usage
      autoUpdate: true,                // 自动更新
      caches: {                        // webpack打包后需要换的文件正则匹配
        main: [
          '**/*.js',
          '**/*.css',
          /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          ],
        additional: [
          ':externals:'
        ]
      },
      externals: [],                    // 设置外部链接，例如配置http://hello.com/getuser，那么在请求这个接口的时候就会进行接口缓存
      excludes: ['**/.*', '**/*.map', '**/*.gz', '**/manifest-last.json'], // 需要过滤的文件
      ServiceWorker: {
        output: 'sw.js',       // 输出目录
        publicPath: '/',    // sw.js 加载路径
        scope: '/',                     // 作用域（此处有坑）
        minify: true,                   // 开启压缩
        events: true                    // 当sw状态改变时候发射对应事件
      }
    }),
  ]
};