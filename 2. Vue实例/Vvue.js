


// Vue从创建Vue实例开始
// let vm=new Vue({// 选项对象})

//  Vue 实例被创建时，
// 它向 Vue 的响应式系统中加入了其 data 对象中所有属性。
// 当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
let data={a:1}

let vm=new Vue({
    el:'#example',
    data:data
})

// vm.a===data.a// =>true

vm.a=2
// data.a// =>2
// 反之亦然
/**
 * 只有当实例创建时data里就存在的属性才是响应式的
 */
vm.b='hi'
// 不会触发任何视图更新 data里面没b


/** 
 * 如果data对象被freeze则vue无法追踪变化
var data={a:2}
data.freeze(data)
new Vue({
  el: '#app',
  data: obj
})

<div id="app">
  <p>{{ foo }}</p>
  <!-- 这里的 `foo` 不会更新！ -->
  <button v-on:click="foo = 'baz'">Change it</button>
</div>
*/


 /**
  *     除了数据属性 
  *     Vue实例还暴露了一些专用属性与方法
  *     ta们都有前缀 '$'
  * 
  *     例如
  *     vm.$data===data
  *     vm.$el===document.getElementById('example')
  * 
  *     vm.$watch('a',function(newValue,oldValue){
  *             //这个回调会在 vm.a发生改变后调用
  *     })
  */


  /**
   *    实例生命周期钩子
   * 每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，
   * 需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。
   * 同时在这个过程中也会运行一些叫做生命周期钩子的函数，
   * 这给了用户在不同阶段添加自己的代码的机会。
   * 
   *    比如 created 钩子在实例被创建之后执行代码
   * 
   *    new Vue({
   *        data:{a:1},
   *        created:function(){
   *            console.log('a:'+this.a)
   *        }
   *    })
   *    生命周期钩子的this上下文指向调用ta的Vue实例
   *    还有其他的一些钩子 在生命周期不同时期调用
   *    比如 mounted、updated、destroyed
   * 
   *    箭头函数没有this 会作为变量一直向上级词法作用域查找结果找不见
   *    所以不要在选项属性或者回调上使用箭头函数
   *    比如 created:()=>console.log('a:'+this.a)
   *         vm.$watch('a',()=>{....})
   *    
   */