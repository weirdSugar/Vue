/**
 *  <插值
 *      
 *      #文本
 *          Mustache语法 
 *          <span>{{msg}}</msg>
 *          绑定为data上msg的值，属性发生改变则插值处的内容都会更新
 * 
 *          通过v-once指令也能执行一次性插值 数据改变时插值处内容不会改变
 *          
 * 
 * 
 *      #原始HTML
 *          双大括号会解释为普通文本非HTML代码（比如&nbsp;）
 *          v-html指令
 *             比如说data里面rawHtml属性为：
 *             span style="color: red">This should be red.</span>
 * 
 *             {{rawHtml}}
 *             <span v-html="rawHtml"></span>
 *             第一行直接把span标签解析为文本显示为
 *                      <span style="color: red">This should be red.</span>
 *             第二行正确显示rawHtml 且是红色
 *                      This should be red
 * 
 * 
 *              不要用v-html复合局部模板，使用组件
 * 
 * 
 *      #属性
 *          v-bind指令
 *              <button v-bind:disable='isBtnDisable'></button>
 *              isBtnDisable存在即视为true
 *              如果isBtnDisable值为 false、null等
 *              则disable特性不会被包含在渲染出来的<button>元素中
 * 
 * 
 * 
 *      #使用JS表达式
 *          所有数据绑定都提供了完整的JS表达式支持比如
 *              {{num+1}}
 *              {{ok?'yes':'no'}}
 *              {{message.split('').reverse().join('')}}
 *              <div v-bind:id="'list-'+id"></div>
 *      这些表达式会在所属Vue实例的data作用域下作为js被解析
 * 
 *      <!-- 这是语句，不是表达式 -->
 *      {{ var a = 1 }}
 * 
 *      <!-- 流控制也不会生效，请使用三元表达式 -->
 *      {{ if (ok) { return message } }}
 * 
 * 
 * 
 * 
 * 
 *      #动态参数
 *          从2.6开始，可用方括号括起来的JS表达式作为一个指令的参数
 *          <a v-bind:[attributeName]='val'></a>
 *          这里的attributeName会被作为JS表达式动态求值
 *          例如Vue实例有一个data属性attribute值为href
 *          则这个绑定等价于v-bind:href
 * 
 *          动态参数预期会求出一个字符串 异常情况下为null 视为移除绑定
 * 
 * 
 *          但是有很大约束  某些字符比如空格引号作为HTML属性名是无效的
 *              v-bind:['foo' + bar]="val" 会发出编译警告
 *              变通办法是不用空格或引号的表达式
 * 
 *          另外直接在HTML文件里写模板 浏览器会把属性名全部转换为小写：
 *          在 DOM 中使用模板会被转换为 v-bind:[someattr]
 *          <a v-bind:[someAttr]="value"> ... </a>
 * 
 * 
 * 
 * 
 * 
 * 
 *      #修饰符
 *          用 . 指明的特殊后缀用于特殊的绑定操作
 *          比如 v-on:click.prevent 
 *          告诉v-on指令触发的事件得是event,preventDefault()
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *      #简写
 *          v-bind和v-on这两个最常用的指令有简写
 * 
 * 
 *          <!-- 完整语法 -->                   <!-- 缩写 -->
 *          <a v-bind:href="url">...</a>       <a :href="url">...</a>
 * 
 * 
 * 
 *          <!-- 完整语法 -->                   <!-- 缩写 -->
 *          <a v-on:click="doSth">...</a>      <a @click="doSth">...</a>
 *         
 */        

