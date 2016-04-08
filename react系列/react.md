## 使用 react 进行开发组件的优雅步骤
原文在此 [thinking-in-react](http://reactjs.cn/react/docs/thinking-in-react.html)  ，我把重要的做些笔记。

### 第一步：拆分用户界面为一个组件树
你要做的第一件事是，为所有组件（及子组件）**命名并画上线框图**。

然而你如何知道哪些才能成为组件？想象一下，当你创建一些函数或对象时，用到一些类似的技术。其中一项技术就是 **单一功能原则**，指的是，理想状态下一个组件应该只做一件事，假如它功能逐渐变大就需要被拆分成更小的子组件。

![](http://7xkpdt.com1.z0.glb.clouddn.com/490bbf9f53b9e82ce824b10b1865f22f.png)

**写出组件树的结构** ，比如

- FilterableProductTable
    - SearchBar
    - ProductTable
        - ProductCategoryRow
        - ProductRow


### 第二步： 利用 React ，创建应用的一个静态版本

为了创建一个渲染数据模型的应用的静态版本，你将会构造一些组件，这些组件重用其它组件，并且通过 `props` 传递数据。

`props` 是一种从父级向子级传递数据的方式。如果你对 `state` 概念熟悉，那么 **不要使用 `state`** 来构建静态版本。 **`state` 仅用于实现交互功能**，

你可以从上至下或者从下至上来构建应用。也就是说，你可以从属性结构的顶部开始构建这些组件（例如，从 `FilterableProductTable` 开始），或者从底部开始（ `ProductRow` ）。在简单的应用中，通常情况下从上至下的方式更加简单；在大型的项目中，从下至上的方式更加简单，这样也可以在构建的同时写测试代码。

### 第三步：识别出最小的（但是完整的）代表 UI 的 `state`

为了正确构建应用，首先需要考虑应用需要的 **最小的可变 `state` 数据模型集合**。此处关键点在于精简：**不要存储任何重复了的数据。**

想象一下表示它的状态最少需要哪些数据，并只把这些数据存入 **this.state**。

当我们需要对用户输入、服务器请求或者时间变化等作出响应，这时才需要使用 `State` 。常用的模式是 **创建多个只负责渲染数据的无状态（stateless）组件**，在它们的上层创建一个有状态（stateful）组件并把它的状态通过 props 传给子级。这个 **有状态的组件封装了所有用户的交互逻辑**，而这些无状态组件则负责 **声明式地渲染数据**。

思考示例应用中的所有数据片段，有(业务逻辑参考上图)：

- 最初的 products 列表
- 用户输入的搜索文本
- 复选框的值
- 过滤后的 products 列表

让我们分析每一项，指出哪一个是 `state` 。简单地对每一项数据提出三个问题：

- 是否会 **随着时间改变**？如果不是，可能不是 `state` 。
- **能根据组件中其它 `state` 数据或者 `props` 计算** 出来吗？如果是，就不是 `state` 。

过滤后的 products 列表可以被搜索文本和复选框的值从初始的 products 列表计算出来。
所以最终， `state` 是：

- 用户输入的搜索文本
- 复选框的值

### 第四步：确认 `state` 的所属组件
接下来，需要指出 **哪个组件会改变或者说拥有这个 `state` 数据模型**。

**React 中数据是沿着组件树从上到下单向流动的**。可能不会立刻明白哪个组件应该拥有哪些 `state` 数据模型。**这对新手通常是最难理解和最具挑战的**。

跟随以下步骤来弄清楚这点：

对于应用中的每一个 **`state` 数据的归属**

1. 找出每一个基于此 `state` 渲染界面的组件。
2. 找出 **共同的祖先组件**。
3. 要么是共同的祖先组件，要么是另外一个在组件树中位于更高层级的组件，应该拥有这个 `state` 。
4. 如果找不出拥有这个 `state` 的合适的组件，创建一个新的组件来维护这个 `state` ，添加到组件树中，层级位于所有共同拥有 `state` 的组件的上面。

### 第五步：添加反向数据流
- 通常是用户对组件树底层子组件的的交互，会产生事件。
- 所谓反向数据流，就是在底层子组件响应事件的方法中，调用了父（上层）组件更新 `state` 的方法。那对于子组件，父组件的方法哪来的呢？
- 只要父组件在子组件声明的时候，将更新 `state` 的方法 **作为一个 prop 传给子组件** 即可。

虽然这听起来有很多内容，但是实际上仅仅需要几行代码。并且关于数据在应用中如何流动真的非常清晰明确。

这样以来，React 内部创建一套合成事件系统来使所有事件在 IE8 和以上浏览器表现一致。也就是说，**React 知道如何冒泡和捕获事件**。



### 就这么简单

希望以上内容让你明白了如何思考用 React 去构造组件和应用。虽然可能比你之前要输入更多的代码，记住，**读代码的时间远比写代码的时间多**，并且阅读这种模块化的清晰的代码是相当容易的。当你开始构建大型的组件库的时候，你将会非常感激这种清晰性和模块化，并且随着代码的复用，整个项目代码量就开始变少了 :)。


## props 和 Spread Attributes
如果你事先知道组件需要的全部 `Props`（属性），`JSX` 一般这样写：

```js
var component = <Component foo={x} bar={y} />;
```

### 修改 Props 是不好的

如果你不知道要设置哪些 `Props`，那么现在最好不要设置它：

```js
var component = <Component />;
component.props.foo = x; // 不好
component.props.bar = y; // 同样不好
```

`Props` 应该被当作禁止修改的。修改 `props` 对象可能会导致预料之外的结果，所以最好不要去修改 `props` 对象。

### Spread Attributes
现在你可以使用 JSX 的新特性 - 延展属性：

```js
var props = {};
props.foo = x;
props.bar = y;
var component = <Component {...props} />;
// or
var CheckLink = React.createClass({
    render: function() {
        // 这样会把 CheckList 所有的 props 复制到 <a>
        return <a {...this.props}>{'√ '}{this.props.children}</a>;
    }
});
React.render(
    <CheckLink href="/checked.html">
    Click here!
    </CheckLink>,
    document.getElementById('example')
);
```

它能被多次使用，也可以和其它属性一起用。注意顺序很重要，后面的会覆盖掉前面的。

```js
var props = { foo: 'default' };
var component = <Component {...props} foo={'override'} />;
console.log(component.props.foo); // 'override'
```


## 组件的详细说明和生命周期

当通过调用 React.createClass() 来创建组件的时候，你应该提供一个包含 `render` 方法的对象，并且也可以包含组件的各类详细属性和生命周期方法。

### 组件的属性对象和方法


#### statics
`object statics`

statics 对象允许你 **定义静态的方法**，这些静态的方法可以在组件类上调用。例如：

```js
var MyComponent = React.createClass({
  statics: {
    customMethod: function(foo) {
      return foo === 'bar';
    }
  },
  render: function() {
  }
});

MyComponent.customMethod('bar');  // true
```

在这个块儿里面定义的方法都是静态的，意味着你可以在任何组件实例创建之前调用它们，这些方法不能获取组件的 props 和 state。如果你想在静态方法中检查 props 的值，在调用处把 props 作为参数传入到静态方法。

#### propTypes
`object propTypes`

`propTypes` 对象允许 **验证** 传入到组件的 `props` 。

```js
React.createClass({
    propTypes: {
        // 可以声明 prop 为指定的 JS 基本类型。默认
        // 情况下，这些 prop 都是可传可不传的。
        optionalArray: React.PropTypes.array,
        optionalBool: React.PropTypes.bool,
        // 所有可以被渲染的对象：数字，字符串，DOM 元素或包含这些类型的数组。
        optionalNode: React.PropTypes.node,
        // React 元素
        optionalElement: React.PropTypes.element,
        // 用 oneOf 来限制 prop 只接受指定的值。
        optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
        // 指定的多个对象类型中的一个
        optionalUnion: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        // 以后任意类型加上 `isRequired` 来使 prop 不可空。
        requiredFunc: React.PropTypes.func.isRequired,
        // etc
        // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接
        // 使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。
        customProp: function(props, propName, componentName) {
            if (!/matchme/.test(props[propName])) {
                return new Error('Validation failed!');
            }
        }
    }
    // ....
})
```

#### mixins
`array mixins`

`mixin` 数组允许使用 **混合** 来在多个组件之间共享行为


#### displayName
`string displayName`

字符串用于输出调试信息。

### 组件生命周期方法
许多方法在组件生命周期中某个确定的时间点执行。

如图（图最好记下来，看完下面的回头多看几遍就记下来了，并且得认真看懂，找到其中的规律）

![](http://7xkpdt.com1.z0.glb.clouddn.com/47e5d9074af9d57ab775dfb7c27693c4.png)

### 第一次 render
#### 1. getDefaultProps
React 支持以声明式的方式来 **定义 `props` 的默认值**。

```js
object getDefaultProps()
```

`getDefaultProps()` 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。


#### 2. getInitialState
```js
object getInitialState()
```

返回值将会作为 `this.state` 的初始值。

在组件类创建的时候调用一次，然后返回值被缓存下来。如果父组件没有指定 `props` 中的某个键，则此处返回的对象中的相应属性将会 **合并** 到 `this.props` （使用 in 检测属性）。

该方法在任何实例创建之前调用，因此不能依赖于 `this.props`。另外，`getDefaultProps()` 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。

#### 3. componentWillMount
服务器端和客户端都只调用一次，在 **初始化渲染执行之前** 立刻调用。如果在这个方法内调用 setState，render() 将会感知到更新后的 state，**将会执行渲染仅一次**，尽管 state 改变了。

#### 4. componentDidMount
在初始化渲染执行之后立刻调用一次。

### State Change
与 `Props Change` 的唯一区别在于没有 其的第一步 `componentWillReceiveProps`，其他都是一致的。
1. shouldComponentUpdate
2. componentWillUpdate
3. render
4. componentDidUpdate

### Props Change
#### 1. componentWillReceiveProps
在组件接收到新的 `props` 的时候调用。

用此函数可以作为 `react` 在 `prop` 传入之后， **render() 渲染之前更新 state 的机会**。老的 `props` 可以通过 `this.props` 获取到。在该函数中调用 `this.setState()` 将不会引起第二次渲染。

```js
componentWillReceiveProps: function(nextProps) {
    this.setState({
        likesIncreasing: nextProps.likeCount > this.props.likeCount
    });
}
```

#### 2. shouldComponentUpdate
在接收到新的 props 或者 state，将要渲染之前调用。在使用 forceUpdate 方法的时候不会调用。

```js
shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.id !== this.props.id;
}
```
如果确定新的 `props` 和 `state` 不会导致组件更新，则此处应该 返回 `false。`

此时，`render()` 将不会执行，直到下一次 `state` `改变。（另外，componentWillUpdate` 和 `componentDidUpdate` 也不会被调用。）

#### 3. componentWillUpdate
```js
componentWillUpdate(object nextProps, object nextState)
```

在接收到新的 `props` 或者 `state` 之前立刻调用。

#### 4. render
#### 5. componentDidUpdate
在组件的更新已经同步到 `DOM` 中之后立刻被调用

### spa 使用路由 react-router
详情见 http://react-guide.github.io/react-router-cn/docs/Introduction.html
