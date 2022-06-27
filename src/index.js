//解决在index.html中引入js文件过多问题,在src目录下拆分业务
//import 是es6语法,script标签是非模块,不支持es6语法
//所以对文件进行打包,支持es6语法
import './banner.js';
import './tab.js';
// 引入jquery并使用
import $ from 'jquery';
$('#swiper').css('background-color', 'red');
