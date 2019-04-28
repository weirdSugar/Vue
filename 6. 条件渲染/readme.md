# v-if

v-if指令在返回
**truthy**
值得时候被渲染

``` HTML
<h1 v-if="awesome">Vue is awesome!</h1>
```

还可以用
```v-else```
添加一个‘else 块’

``` HTML
<h1 v-if="Math.random()>0.5">Now u see me</h1>
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
