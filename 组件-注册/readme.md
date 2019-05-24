

当直接在 DOM 中使用一个组件 (而不是在字符串模板或单文件组件) 的时候，
强烈推荐遵循 W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。


# 全局注册

``` JS
Vue.component('compotent-A',{/** */})
Vue.component('compotent-B',{/** */})
Vue.component('compotent-C',{/** */})

new Vue({el:'#app'})
```
``` HTML
<div id='app'>
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```

`Vue.component()` 是全局注册的，注册之后可以用在任何新创建的根实例`new Vue`，
包括所有子组件内部各自互相使用






# 局部注册

全局注册往往是不够理想的。

比如，如果你使用一个像 webpack 这样的构建系统，

全局注册所有的组件意味着即便你已经不再使用一个组件了，

它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。


你可以通过一个普通的 JavaScript 对象来定义组件：
``` JS
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }

//然后在 components 选项中定义你想要使用的组件：

new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
// 对于 components 对象中的每个属性来说，
// 其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象。
```

注意局部注册的组件在其子组件中 __不可用__
例如，如果你希望 `ComponentA `在 `ComponentB` 中可用，则你需要这样写：
``` JS
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

模块的方式写：
``` JS
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
```
注意在 ES2015+ 中，在对象中放一个类似 ComponentA 的变量名其实是 ComponentA: ComponentA 的缩写，即这个变量名同时是：

用在模板中的自定义元素的名称
包含了这个组件选项的变量名