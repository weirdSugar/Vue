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


