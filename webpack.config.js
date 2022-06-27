// src并列处,新建webpack.config.js
// 填入配置项

const path = require('path');
// 引入自动生成的html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //自动删除dist下生成的文件

module.exports = {
  mode: 'development', //mode模式开发/生产阶段,解除警告
  //入口
  entry: './src/index.js',
  //出口
  output: {
    //path.resolve()相当于path.join()
    //__dirname动态获取当前文件所属目录的绝对路径
    path: path.resolve(__dirname, 'dist'), //出口路径必须是绝对路径,保证能找到
    filename: 'bundle.js', //出口文件名
  },
  plugins: [
    //打包后生成html文件并自动引入打包后的js
    //在括号内自定义打包的html模板,和输出的文件名
    new HtmlWebpackPlugin({
      template: './public/index.html', //以自己的html文件作为模板生成dist/index.html文件
      filename: 'index.html', //文件名
    }),
    new CleanWebpackPlugin(), //删除的是output/path的那个文件夹
  ],
  //webpack开发服务器,本地开启服务器,实时监听文件更新文件,打包内容会存进缓存,每次只更新修改部分,结果显示页面上
  devServer: {
    // port:3000, 端口号,使用默认的,默认的被占用,再使用其他的
    open: true,
  },
};
