``` JS
Vue.component('button-counter',{
    data:function(){
        return {
            count:0
        }
    },
    template:'<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

组件是可复用的 Vue 实例，所以接受跟`new Vue`一样的选项

除了`el`这样根实例特有的选项

且带有一个名字

这个例子里面是`<button-counter>`

我们可以在 根实例 中将这个组件作为自定义元素使用

``` HTML
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

``` JS
new Vue({ el: '#components-demo' })
```




#组件的复用

组件可以重复使用

``` HTML
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

__每个组件会维护自己独立的`counter`,每用一次组件就会有创建一个新实例__


`data`必须是个函数
---

因此每个实例可以维护被返回的独立拷贝

如果直接写
``` JS
data:{
    count:0
}
```
那么上例中点一个按钮所有的都会加1





# 组件的组织

网页就是一个嵌套的组件树：

![组件树](https://cn.vuejs.org/images/components.png)


使用组件前必须先注册，分别有 __全局注册__ 和 __局部注册__

全局注册的组件可以用在其被注册之后的任何 (通过 new Vue) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。
vmw




#通过prop向组件传递数据

prop是可以在组件上自定义的特性

相当于组件的 `data`

当一个值传递给一个 prop 特性的时候，它就变成了那个 __组件实例__ 的一个属性。

``` JS
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

一个组件可以拥有任意数量的prop，任何值都可以传递

注册好后就能在组件实例中访问这个值(`template:'...'`)，就像访问`data`一样

上述模板写好后就可以从实例中作为一个自定义特性传递值了

``` HTML
<blog-post title="A"></blog-post>
<blog-post title="B"></blog-post>
<blog-post title="C"></blog-post>
```


聪明点还可以`v-bind`动态传递prop
``` HTML
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```
``` JS
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
      { id: 3, title: 'C' }
    ]
  }
})
```





# 监听子组件事件

还是上面的`<blog-post>` 比如里面有个`<button>`点一下本组件里面字体放大

做法是在父组件上`v-on`一个字体号放大的方法(监听)  `v-on:自选一个名字=''`

子组件中调用`$emit`方法触发事件  `v-on:clice='自定义的名字'`


根实例:
``` JS
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [/** */],
    postFontSize: 1
  },
  methods:{
    big:function(){
      this.postFontSize+=1
    }
  }
})
```

``` HTML
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'rem' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
      v-on:enlarge-text="big"
    ></blog-post>
  </div>
</div>
```


组件：
``` JS
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('enlarge-text')">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
```



__注意 不可能直接在button上 v-on:click='big' 因为big是父组件那层的方法__



`$emit`第二个参数
---

例如我们想让`<blog-post>`组件决定字号增大多少 而不是由 `big`决定

子组件中`v-on:click="$emit('enlarge','0.1')"`

父组件中可以用$event接收`v-on:enlarge="postFontSize += $event"`



或者就要用方法，比如`v-on:enlarge="big"`的话，此参数会作为第一个参数传入方法中

还是
``` HTML
<blog-post
  ...
  v-on:enlarge-text="big"
></blog-post>
```
``` JS
methods: {
  big: function (enlargeAmount) {
    // enlargeAmount接收 $emit的第二个参数
    this.postFontSize += enlargeAmount
  }
}
```




在组件上使用 `v-model`
===

`<input v-model="searchText">`

等价于

``` HTML
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
<!-- 这的value是正儿八经的value -->
<!-- v-on:input 这的input是正儿八经事件 -->
```


而v-model在组件上时是这样的：

```HTML
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
<!-- 这的 :value 是prop参数自定义属性 用于子组件中bind正儿八经的value -->
<!-- 这的v-on:input 是自定义事件 监听子组件中正儿八经的input事件用 -->
```


组件这么写：

``` JS
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```
``` HTML
<custom-input v-model="searchText"></custom-input>
```

我们的组件模板是个`input` 名叫`<custom-input>`

我们想`<custom-input v-model='dataText'>`

那么组件中的`<input>`需要将`value`属性(这个是正儿八经的属性)`:bind`Prop中的`value`,

还要`v-on:input`(这个input是正儿八经的事件)触发父组件中的自定义input事件





# 动态组件

比如一个多标签界面切换 十分实用

动态组件通过 Vue 的 `<component>` 元素加一个特殊的 `is` 特性来实现：

``` HTML
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

上述示例中 `currentTabComponent`可以是 __已注册组件的名字__ 或 __已注册组件的名字__