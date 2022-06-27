// src并列处,新建webpack.config.js
// 填入配置项

const path = require('path');
// 引入自动生成的html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //自动删除dist下生成的文件

module.exports = {
  mode: 'development', //mode模式开发/生产阶段,解除警告
  //入口
  entry: './src/main.js',
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

  module: {
    // loader 加载器 配置在这儿
    rules: [
      // loader的规则
      {
        //处理css文件
        test: /\.css$/, // 匹配所有的css文件
        // loader执行顺序:从右到左
        // css-loader 识别css内容并打包
        // style-loader 将样式, 把css插入到dom中
        use: ['style-loader', 'css-loader'],
      },
      {
        //处理less文件
        test: /\.less$/, // 匹配执行类型的文件
        // 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
        // 执行的顺序 less-loader css-loader style-loader
        //'less-loader'less转成css
        //'css-loader' css转成webpack识别的代码
        //style-loader 代码插入dom
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      //   {
      //     //webpack4
      //     test: /\.(png|jpg|gif|jpeg)$/i,
      //     use: [
      //       {
      //         loader: 'url-loader', // 图片转base64字符串打包到js中
      //         //配置limit超过8kb直接复制到dist下面,不超过8kb转base64
      //         options: {
      //           limit: 1 * 1024,
      //         },
      //       },
      //     ],
      //   },
      {
        // 图片文件的配置(仅适用于webpack5版本)
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: 'asset', // 复制一份到dist 或者转base64
        // type: 'asset/resource' // 复制一份到dist
        // type: 'asset/inline' // 转base64
        // parse: {
        //   dataUrlCondition: {
        //     maxSize: 8 * 1024,
        //   },
        // },
      },
      {
        // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource',
        //解析器
        generator: {
          filename: 'font-[name].[hash:6][ext]',
          //输出的文件名:文件打包之后生成的哈希值,指定为6位,[ext]是文件的扩展名
        },
      },
      //   { // 处理字体图标的解析
      //     test: /\.(eot|svg|ttf|woff|woff2)$/,
      //         use: [
      //             {
      //                 loader: 'url-loader',
      //                 options: {
      //                     limit: 2 * 1024,
      //                     // 配置输出的文件名
      //                     name: '[name].[ext]',
      //                     // 配置输出的文件目录
      //                     outputPath: "fonts/"
      //                 }
      //             }
      //         ]
      // },
      //babel-loader可以webpack对js高级语法进行降级,打包
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 预设:转码规则(用bable开发环境本来预设的)
          },
        },
      },
    ],
  },
};
