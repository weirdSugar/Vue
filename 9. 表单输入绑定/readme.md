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