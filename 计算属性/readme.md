# 计算属性  
* * *
    模板中放入太多的逻辑会让模板过重且难以维护。例如：

    ``` HTML
    <div id="example">
    {{ message.split('').reverse().join('') }}
    </div>
    ```
    像任何这种复杂逻辑的应当使用计算属性
    

        ***实质： vue实例里面专门computed：{}，里面放一堆专门计算的function
                  注意引用的时候直接computedFunc 不用加括号 computedFunc()






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