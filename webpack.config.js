/* 
webpack的配置: commonjs的语法向外暴露一个配置对象
__dirname: 代表当前文件所在目录的绝对路径
*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/* 
用于得到指定目录的绝对路径
*/
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

const SRC_DIR = 'src08_UI'

module.exports = {
  // 打包模式: 不同打包模式对应不同的内置的默认配置
  // mode: 'production'
  // mode: 'development',

  // 入口: 指定入口js
  // entry: './src/index.js'
  // entry: path.resolve(__dirname, 'src/index.js')
  entry: {
    xxx: ['@babel/polyfill', resolve(SRC_DIR + '/index.js')]
  },
  // 出口
  output: {
    path: resolve('dist'), // 生成打包文件的基础路径(必须是绝对路径)
    // [name]: 入口js的名称xxx
    filename: 'js/[name].js',     // 生成的js: dist/js/xxx.js
    publicPath: '/', // 引入打包的文件时路径以/开头
  },

  // 模块打包器
  module: {
    rules: [
      // 处理vue文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      // ES6 ==> ES5
      {
        test: /\.js$/,  // 通过正则指定匹配处理的文件  处理所有的js文件
        // exclude: /node_modules/, // 排除法: 不对正则匹配的文件夹下所有js文件
        include: [resolve(SRC_DIR)], // 包含法: 只对指定目录的js进行处理

        // user: 'babel-loader', // 如果loader没有额外的options
        use: { // 指定loader
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env'], // 指定预设包: 包含了需要用的绝大部分babel的插件包
            plugins: [
              [ // 配置babel-plugin-component
                "component",
                {
                  "libraryName": "element-ui", // 针对的是element-ui库的组件
                  "styleLibraryName": "theme-chalk" // 自动引入组件对应的样式文件
                }
              ]
            ] // 一旦我们需要一个另外babel插件, 需要在此配置
          }
        }
      },

      // 处理css
      {
        test: /\.css$/, // 处理css文件
         // styleLoader(cssLoader(css文件)) css文件内容 ==css-loader==> js中 ==style-loader==> html的<style>中
        // vue-style-loader是对style-loader的增强
        use: ['vue-style-loader', 'css-loader'] 
      },

      // 图片
      {
        test: /\.(png|jpg|gif)$/, // 处理3种类型的图片
        use: [
          {
            loader: 'url-loader',  // 必须同时下载file-loader, 内部它需要file-loader
            options: {
              limit: 1024 * 42, // 小于这个值的图片就会进行base64处理
              /* 
              [name]: 图片文件名
              [ext]: 文件的扩展名
              */
              name: 'img/[name].[ext]' // 相对于output.path  dist
            }
          }
        ]
      },

      // 处理font文件
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, 
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html', // 从执行命令所在目录查找
      filename: 'index.html' // 指定打包生成的页面  注意: 生成在output.path指定的目录下
    }),

    // 请确保引入这个插件
    new VueLoaderPlugin(),

    // 将public下的所有全局资源拷贝到dist下(public下index.html除外的所有文件)！
    new CopyWebpackPlugin([
      { 
        // from: 'source', 
        // to: 'dest'
        from: resolve('public'), // 指定public的绝对路径 ==> 拷贝它下面所有层次目录和文件
        to: resolve('dist'), // 指定dist的绝对路径, 复制到dist文件下
        ignore: ['index.html'], // 忽略public下的index.html文件(不拷贝)
      },
    ]),
  ],

  // webpack开发服务器配置
  devServer: {
    open: true, // 自动打开浏览器
    port: 8080, // 指定启动服务器的端口号
    stats: 'errors-only', // 只输出错误日志
    proxy: {
      // 处理以/api开头路径的请求
      // '/api': 'http://localhost:4000'
      // http://localhost:4000/api/search/users   
      '/api': {
        target: 'http://localhost:4000', // 转发的目标地址(服务器接口地址)
        pathRewrite: {
          '^/api': ''  // 转发请求时去除路径前面的/api     ==> http://localhost:4000/search/users
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      },
      // 可以配置多个
      '/gh': {
        target: 'https://api.github.com', // 转发的目标地址
        pathRewrite: {
          '^/gh' : ''  // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      }
    },
    historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
  },

  // 开启source-map调试: 当运行出错时, 能知道是哪个源文件的哪一行出的错
  devtool: 'cheap-module-eval-source-map',

  // 如何解析模块
  resolve: {
    // 指定哪些模块的扩展名可以省略
    extensions: ['.js', '.vue'],

    // 指定模块路径别名
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',  // form 'vue'时查找带编译器的版本
      '@': resolve(SRC_DIR), // 别名@对应src的绝对路径
      '@components': resolve(`${SRC_DIR}/components`),
    }
  }
}