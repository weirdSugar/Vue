```v-for```可以直接这么写

``` HTML
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

出来就是显示

            1 2 3 4 5 6 7 8 9 10


# 数组渲染

```v-for```根据一组数组的选项列表进行渲染。

```v-for```需要```item in items```形式的语法
当然按道理应该是用 ```item of items```更像 也可以这么写

``` HTML
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
```

``` JS
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```


```v-for```还支持一个可选的第二参数作为index

```v-for```块中拥有对父作用域的完全访问权限

``` HTML
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

``` JS
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```



# 数组渲染的注意事项

### vue不能检测并响应以下变动的数组

1.利用索引设置项时，```vm.items[indexOfItem] = newValue```
2.直接修改length， ```vm.items.length = newLength```

eg:
``` JS
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

1  2  问题都可以换个方法用```splice```解决

``` JS
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

``` JS
vm.items.splice(newLength)
```


vue还提供了独家方法解决1.问题

``` JS
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
```

你也可以使用 ```vm.$set``` 实例方法，该方法是全局方法 ```Vue.set``` 的一个别名：

``` JS
vm.$set(vm.items, indexOfItem, newValue)
```












# 对象渲染

也可以用一个对象来迭代

也提供可选的第二个参数 键名，以及第三个index

___注意和JS不一样 这in出来直接是value__

``` HTML
<ul id="v-for-object" class="demo">
  <li v-for="(value,keyname,index) in object">
    {{index}}. {{keyname}} : {{ value }}
  </li>
</ul>
```

``` JS
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
```

#对象渲染的注意事项

vue
___不能检测检测对象属性的添加或删除：__


``` JS
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 不响应
```


解决：

``` JS
Vue.set(vm.somedata, 'age', 27)
//或者
vm.$set(vm.somedata, 'age', 27)
```

如果一次性赋予多个属性一般会用```Object.assign()```或者_.extend()

这时候不能直接：

``` JS
Object.assign(vm.somedata, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

需要将合并后的赋予空对象

``` JS
vm.somedata=Object.assign({}, vm.somedata, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```






# 当数据顺序变动时


默认在数据项顺序改变时 vue不会移动DOM元素来匹配数据项的顺序 只是会简单复用每个元素

必须给每项设一个```key```值以便追踪每个节点以便追踪 复用重新排序

___请保持```key```值唯一不变__

``` HTML
<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>
```

建议
___尽可能__
在使用```v-for```时提供```key```属性

除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

ps：```key```是vue识别节点的通用的机制 并不与```v-for```特别关联






# 显示过滤/排序结果

想要显示一个数组的过滤或排序副本，而不实际改变或重置原始数据。
这个时候就用到了计算属性 

``` JS
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  even: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
//注意 要用computed 就只能  n in even   因为even直接是作为getter函数
```

``` HTML
<li v-for="n in even()">{{ n }}</li>
```

如果计算属性不适用 可以换 method方法

``` JS
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```





__处于同一节点时 ```v-for``` 优先级比 ```v-if```高__

不推荐 ```v-for ``` 和 ```v-if```同时使用 想要过滤见上
---

如果是有目的的跳过循环的执行可以把```v-if```放在外层元素

``` HTML
<ul v-if="todos.length">
  <li v-for="todo in todos">
    {{ todo }}
  </li>
</ul>
<p v-else>No todos left!</p>
```