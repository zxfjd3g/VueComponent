/* 
webpack的配置: commonjs的语法向外暴露一个配置对象
__dirname: 代表当前文件所在目录的绝对路径
*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* 
用于得到指定目录的绝对路径
*/
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 打包模式: 不同打包模式对应不同的内置的默认配置
  // mode: 'production'
  // mode: 'development',

  // 入口: 指定入口js
  // entry: './src/index.js'
  // entry: path.resolve(__dirname, 'src/index.js')
  entry: {
    xxx: resolve('src/index.js')
  },
  // 出口
  output: {
    path: resolve('dist'), // 生成打包文件的基础路径(必须是绝对路径)
    // [name]: 入口js的名称xxx
    filename: 'js/[name].js'     // 生成的js: dist/js/xxx.js
  },

  // 模块打包器
  module: {
    rules: [
      // ES6 ==> ES5
      {
        test: /\.js$/,  // 通过正则指定匹配处理的文件  处理所有的js文件
        // exclude: /node_modules/, // 排除法: 不对正则匹配的文件夹下所有js文件
        include: [resolve('src')], // 包含法: 只对指定目录的js进行处理

        // user: 'babel-loader', // 如果loader没有额外的options
        use: { // 指定loader
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env'], // 指定预设包: 包含了需要用的绝大部分babel的插件包
            plugins: [] // 一旦我们需要一个另外babel插件, 需要在此配置
          }
        }
      },

      // 处理css
      {
        test: /\.css$/, // 处理css文件
         // styleLoader(cssLoader(css文件)) css文件内容 ==css-loader==> js中 ==style-loader==> html的<style>中
        use: ['style-loader', 'css-loader'] 
      },

      // 图片
      {
        test: /\.(png|jpg|gif)$/, // 处理3种类型的图片
        use: [
          {
            loader: 'url-loader',  // 必须同时下载file-loader, 内部它需要file-loader
            options: {
              limit: 1024 * 8, // 小于这个值的图片就会进行base64处理
              /* 
              [name]: 图片文件名
              [ext]: 文件的扩展名
              */
              name: 'img/[name].[ext]' // 相对于output.path  dist
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
    })
  ],

  // webpack开发服务器配置
  devServer: {
    open: true, // 自动打开浏览器
    port: 8080, // 指定启动服务器的端口号
    stats: 'errors-only', // 只输出错误日志
  },

  // 开启source-map调试: 当运行出错时, 能知道是哪个源文件的哪一行出的错
  devtool: 'cheap-module-eval-source-map',
}