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