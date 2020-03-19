//1、导入对象中定义的变量
import {flag,sum} from "./aaa.js";

if (flag){
  console.log('小明是个天才，哈哈哈')
}

console.log(sum(20, 30));

//2、直接导入export中定义的变量
import {num1,height} from "./aaa.js ";

console.log(num1);
console.log(height);

//3、导入export中的function

import {mul,Person} from "./aaa.js";

console.log(mul(30, 50));

const p = new Person();

p.run()

//4、导入 export default中的内容

import addr from './aaa.js'

// console.log(addr);

addr('你好哇')

//5、统一全部导入
import * as all from './aaa.js'

console.log(all.flag);
console.log(all.height);