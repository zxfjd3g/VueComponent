import {sum} from './math' // 引入js模块
import logo from './assets/imgs/logo.png' // 引入图片
import './assets/css/my.css' // 引入css模块

console.log('Hello Webpack!', sum(2, 3))
document.getElementById('root').innerHTML = '<h1>Hello555</h1>'

// ES6语法
const fn = () => {
  console.log('fn()')
}

// 使用图片模块
const image = new Image()
image.src = logo
document.body.appendChild(image) // <body>中会多一个<img>