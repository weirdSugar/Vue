# v-if

v-if指令在返回
**truthy**
值得时候被渲染

``` HTML
<h1 v-if="awesome">Vue is awesome!</h1>
```

还可以用
```v-else```
```v-else-if```
添加一个‘else 块’

``` HTML
<h1 v-if="Math.random()>0.5||seen===true">Now u see me</h1>
<h1 v-else>Oh no 😢</h1>
```





在```<template>```元素上使用 v-if 条件渲染分组
---

在```<template>```上用v-if可以一下渲染多个元素

``` HTML
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```



## vue中的复用元素

vue通常会复用已有元素而不是从头开始渲染。

么做除了使 Vue 变得非常快之外，还有其它一些好处。

例如，如果你允许用户在不同的登录方式之间切换：

``` HTML
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>
```




在上面的代码中切换loginType不会清除input中已输入的内容

因为两个模板使用了同一元素，仅仅只是替换了```placeholder```


当然你也可以选择

“两个元素是完全独立的，不要复用它们”

只需要添加一个唯一的```key```属性即可

``` HTML
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

___注意__
```<label>```元素仍会被复用 就是里面字变了而已




最有一点注意```v-show```
---

```v-show```只是简单的切换```display```属性

也就是说会始终被渲染 保留在DOM中



```v-if```是“真正”的条件渲染

会确保在切换过程中条件块内的事件监听器和

子组件适当地被销毁和重建。


一般来说，```v-if``` 有更高的切换开销，

而```v-show```有更高的初始渲染开销。

因此，如果需要非常频繁地切换，则使用 ```v-show ```较好；

如果在运行时条件很少改变，则使用 ```v-if``` 较好。

___```v-show```不支持```<template>```元素__