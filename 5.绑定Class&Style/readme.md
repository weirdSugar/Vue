在将 v-bind 用于 class 和 style 时，Vue.js 做了专门的增强。

表达式结果的类型除了字符串之外，还可以是
**对象或数组**


#绑定Class

## 对象语法

可以传给 
`v-bind:{className:true/false}`
 一个对象，以动态地切换 class：

 ``` HTML
 <div v-bind:class="{ active: isActive }"></div>
 ```

上面的语法表示
`active`
这个class存在与否取决于值
`isActive`
的truthiness


以在对象中传入更多属性来动态切换多个 class。并且实时更新

此外，v-bind:class 指令也可以与普通的 class 属性共存。

``` HTML
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

``` JS
data: {
  isActive: true,
  hasError: false
}
```

结果就变成了：

``` HTML
<div class="static active"></div>
```



也可以直接在
`data`
里写个obj

``` JS
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

``` HTML
<div v-bind:class="classObject"></div>
```



还可以绑定一个
**计算属性**

这是一个常用且强大的模式

``` HTML
<div v-bind:class="classObject"></div>
```

``` JS
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```




## 数组语法

`v-bind:class`
还可以等于一个数组

``` HTML
<div v-bind:class="[activeClass, errorClass]"></div>
```

``` JS 
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

``` HTML
<div class="active text-danger"></div>
```


如果想根据条件切换可以用三元表达式：

``` HTML 
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

多个条件class更好的办法是：

``` HTML
<div v-bind:class="[{ active: isActive }, errorClass]"></div
```



#绑定Style

##对象语法

`v-bind:style`
CSS 属性名可以用
**驼峰式 (camelCase)**

或
**短横线分隔 (kebab-case，记得用单引号括起来)**
来命名：

``` HTML
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

``` JS
data: {
  activeColor: 'red',
  fontSize: 30
}
```

绑定到一个样式对象更好，这样更清晰

``` HTML
<div v-bind:style="styleObject"></div>
```

``` JS
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

**同样的，对象语法常常结合返回对象的计算属性使用。**




## 数组语法

`v-bind:style`
 的数组语法可以将多个样式对象应用到同一个元素上：

 ``` HTML
 <div v-bind:style="[baseStyles, overridingStyles]"></div>
 ```
