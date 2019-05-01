便是```v-on:```指令

还可以简写为```@click='method'```

``` HTML
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

``` JS
var example1 = new Vue({
  el: '#example-1',
  data: {
    counter: 0
  }
})
```




``` HTML
<div id="example-2">
  <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>
```

``` JS
var example2 = new Vue({
  el: '#example-2',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
})

// 也可以用 JavaScript 直接调用方法
example2.greet() // => 'Hello Vue.js!'
```


__vue中还有奇怪的：__

``` HTML
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```

``` JS
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```

就是说 ```v-on```后```=```的method还可以带括号传参

__注意这个时候method里面的event事件对象不会自动传入，需要调用时候手动传入$event参数：__


``` HTML
<button v-on:click="warn('submit prevented', $event)">
  Submit
</button>
```

``` JS
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```







## 事件修饰符

对```event.prevenDefault()```,```event.stopPropagation()```等常用事件方法封装


___```.stop```__:阻止捕获和冒泡


___```.prevent```__:阻止默认事件

``` HTML
<form v-on:submit.prevent="onSubmit"></form>
<!-- 提交事件不再重载页面 -->
```


___```.capture```__:变为捕获模式


___```.self```__:当前元素自身时才会触发函数，忽略冒上来的泡/捕获

根据event.target确定是否为当前元素本身

``` HTML
<div v-on:click.self="gett">1
<div  v-on:click="tz">2</div>
</div>
<!-- 如果点击2，冒泡不会执行gett方法，因为event.target指的是2的dom元素，不是1的，所以不会触发自己的点击事件 -->
```


___```.once```__:只触发一次


___```.passive```__:忽略```event.preventDefault()```



___顺序很重要：```@click.prevent.self```会阻止所有点击__

___```@click.self.prevent```会阻止对自身的点击__






## 按键事件修饰符

[```KeyboardEvent.key```](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key/Key_Values)暴露的值都可以用小写短横线写法

``` HTML
<input v-on:keyup.enter="someMethod">
<!-- 摁回车才会调用vm.someMethod() -->

<input v-on:keyup.arrow-down="downFunc">
<!-- KeyboardEvent.key里面是 ArrowDown -->
```


为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：

```.enter```
```.tab```
```.delete```(捕获“删除”和“退格”键)
```.esc```
```.space```
```.up```
```.down```
```.left```
```.right```



___ keycode也支持__

&

___系统修饰符__ 以实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

``` HTML
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

