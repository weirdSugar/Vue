# 计算属性  
* * *
    模板中放入太多的逻辑会让模板过重且难以维护。例如：


``` HTML
  <div id="example">
  {{ message.split('').reverse().join('') }}
  </div>
```

    像任何这种复杂逻辑的应当使用计算属性
    



   ## 基础例子


``` HTML
  <div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
  </div>
```

``` JS
      var vm = new Vue({
      el: '#example',
      data: {
          message: 'Hello'
      },
      computed: {
          // 计算属性的 getter
              reversedMessage: function () {
              // `this` 指向 vm 实例
              return this.message.split('').reverse().join('')
              }
          }
      })
```


* * *



## **实质**：


vue实例里面专门computed：{}，里面放一堆专门计算的function

注意引用的时候直接computedFunc 不用加括号 computedFunc()

因为computed里面的函数作为属性vm.computedFunc的getter函数



* * *



## 
**与方法的不同**：


讲道理可以通过调用方法也能达到同样效果


``` JS
    methods: {
       reversedMessage: function () {
         return this.message.split('').reverse().join('')
      }
    }
```


``` HTML
    <p>Reversed message: "{{ reversedMessage() }}"</p>
```


方法与计算属性的不同是：


计算属性是基于他们的响应式依赖进行缓存，


只在相关依赖发生改变（比如上例中的message）他们才会重新求值


只要依赖没有改变


多次访问computedFunc会立即返回之前的结果，（缓存）


而比如再访一次上例中的reverseMessage()文字便会又转回来了

            

* * *





## 
**计算属性的setter**

  计算属性默认只有getter，也可以设置一个setter

``` JS
        // ...
        computed: {
            fullName: {
                // getter
                get: function () {
                    return this.firstName + ' ' + this.lastName
                },
                // setter
                set: function (newValue) {
                    var names = newValue.split(' ')
                    this.firstName = names[0]
                    this.lastName = names[names.length - 1]
                    }
                }
        }
        // ...
```




* * *



## 
**计算属性vs侦听属性**

Vue的 `watch` 侦听属性，来观察和响应 Vue 实例上的数据变动


当数据变化时执行异步或开销较大的操作 这个方式最有用
 


``` HTML
<div id="watch-example">
    <p>Ask a yes/no question:
    <input v-model="question">
    </p>
    <p>{{ answer }}</p>
</div>
<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
```

``` JS
var watchExampleVM = new Vue({
  el: '#watch-example',
  data: {
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  }
})
```
    



需要強調的是
---


当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 
`watch`


然而，通常大多數情況下更好的做法是使用 
__计算属性__


而不是命令式的 watch 回调。


细想一下这个例子：

``` HTML
<div id="demo">{{ fullName }}</div>
```


``` JS
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

``` JS
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```

