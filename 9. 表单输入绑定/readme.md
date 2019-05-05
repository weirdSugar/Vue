你可以用 v-model 指令在表单 ```<input>```、```<textarea>```

 及 ```<select>``` 元素上创建双向数据绑定。

它会根据控件类型自动选取正确的方法来更新元素




## input

``` HTML
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```



## textarea

``` HTML
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

__```<textarea>{{text}}</textarea>```不会生效，用```v-model```代替__




## checkbox

单个复选框绑定布尔值

``` HTML
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```


多个复选框 绑定到一个数组

``` HTML
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>
```

``` JS
new Vue({
  el: '#example-3',
  data: {
    checkedNames: []
  }
})
```




## radio

``` HTML
<input type="radio" id="one" value="One" v-model="picked">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="picked">
<label for="two">Two</label>
<br>
<span>Picked: {{ picked }}</span>
```





## select

单选：

``` HTML
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<span>Selected: {{ selected }}</span>
```

``` JS
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```

__建议加一个```<option disable>```要不一上来是空的会导致ios没法选__





多选(绑定到一个数组)：

``` HTML
<div id="example-6">
  <select v-model="selected" multiple style="width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>
```

``` JS
new Vue({
  el: '#example-6',
  data: {
    selected: []
  }
})
```





用```v-for```动态渲染```option```

``` HTML
<select v-model="selected">
  <option v-for="option in options" v-bind:value="option.value">
    <!-- 如果不加v-bind:value span里面就显示的是option.text -->
    {{ option.text }}
  </option>
</select>
<span>Selected: {{ selected }}</span>
```

``` JS
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```





# 修饰符


```.lazy```
---

默认情况下,```v-model``` 在每次 ```input``` 事件触发后将输入框的值与数据进行同步

```.lazy```修饰符转变为```change```事件同步

``` HTML
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```



```.number```
---

使用户输入的值转为数值类型

``` HTML
<input v-model.number="age" type="number">
```

即使在 ```type="number"``` 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 parseFloat() 解析，则会返回原始的值。




```.trim```

自动过滤用户输入的首尾空白字符

``` HTML
<input v-model.trim="msg">
```