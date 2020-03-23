//1、使用commonjs的模块化规范
const {sum,mul} = require('./js/mathUtils.js')

console.log(sum(10, 20));
console.log(mul(30, 40));

//2、使用ES6的模块化规范
import {name,age,height} from './js/info'

console.log(name);
console.log(age);
console.log(height);

//3、依赖css文件
require('./css/normal.css')

//4、依赖less文件
require('./css/speical.less')

document.writeln('<h2>你好啊，李银河</h2>')