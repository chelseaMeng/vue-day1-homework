//引入app.vue
import './app.vue'
//解决在index.html中引入js文件过多问题,在src目录下拆分业务
//import 是es6语法,script标签是非模块,不支持es6语法
//所以对文件进行打包,支持es6语法
import './banner.js';
import './tab.js';
// 引入jquery并使用
import $ from 'jquery';
$('#swiper').css('background-color', 'blue');
//引入index,css
// import './styles/index.css';
import './styles/index.less';
//js里引入图片  会报错,webpack值识别json和js文件 不识别图片
//插入的图片没有显示
import imgUrl from './assets/1.gif';
let img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);

import imgUrl1 from './assets/logo_small.png';
let img1 = document.createElement('img');
img1.src = imgUrl1;
document.body.appendChild(img1);

// 引入字体图标文件
import './assets/fonts/iconfont.css';

class App {
  static a = 123;
}

console.log(App.a);
