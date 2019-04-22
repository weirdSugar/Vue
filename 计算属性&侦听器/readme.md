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







*** . ***



# **实质**：
=== 
                  vue实例里面专门computed：{}，里面放一堆专门计算的function
                  注意引用的时候直接computedFunc 不用加括号 computedFunc()
                  因为computed里面的函数作为属性vm.computedFunc的getter函数



*** . ***



# --与方法的不同--：
===
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

            

*** . ***





 