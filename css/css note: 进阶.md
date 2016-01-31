## 玉伯论 html css 的重要性
https://github.com/lifesinger/blog/issues/105

让块元素水平居中。一般大家都会写成：

```css
.content {
    width: 980px;
    margin: 0 auto;
}
```

上面的代码能正常工作，大部分情况下也不会有问题，但上面的代码存在思维的懒惰。应该写成:
```css
.content {
    width: 980px;
    margin-left: auto;
    margin-right auto;
}
```

看起来代码变多了，变啰嗦了。但如果你真经过思考，就会明白：

margin: 0 auto 中的 0 绝大部分情况下是冗余的，页面上早就有 reset.css 或 normalize.css 重置过
margin: 0 auto **不纯粹**，你要的是“水平居中”，却顺便把 top / bottom 给重置了
不纯粹会导致顺序和优先级的依赖，比如有另一处要给 margin-top/bottom 赋值时，就必须要提高优先级
进一步的东西是，我一直觉得CSS里，有一个重要的原则：

**最小影响原则**

你在写某段CSS代码时，首先要非常清楚地知道这段CSS代码的功能，其次要尽量严格保障这段CSS代码只实现了你想要实现的功能。

这就如医生动手术，好好做好本分就行，千万别留下一个小镊子在病人身体里。

与HTML代码一样，对CSS代码来说，很重要的两个衡量标准也是稳定和灵活。
