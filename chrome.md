## dev tool
### console 面板
#### inspect(elem)
跳转到 elements 面板的指定元素节点

```js
elem = $('body')
inspect(elem)
```

#### copy(values)
将数据复制到剪贴板

#### values(object)
获取对象的所有属性值，返回数组

#### Ctrl + L
和 clear() 效果一样： 清空当前的 console 面板

#### getEventListeners(node)
可以获取当前节点绑定的事件，返回一个数组


#### console.trace()
可以追踪代码执行过程中的栈信息

#### console.dir(obj)
打印 obj 的对象树(很有用)

#### console.table(arr)
输出数组数据
![](http://7xkpdt.com1.z0.glb.clouddn.com/42519b5be483b64b3db62f03e6f97e93.png)

### other
#### animation 检查器
使用 animation 检查器可以检查运行中的 CSS 动画属性

![](http://7xkpdt.com1.z0.glb.clouddn.com/ab72cebeee231614a14682474bd56e71.png)

#### 可视化资源依赖关系
绿色资源为初始化资源，红色资源由绿色资源引入

![](http://7xkpdt.com1.z0.glb.clouddn.com/9cebb7a7d2db6d673333663732c75e51.png)
