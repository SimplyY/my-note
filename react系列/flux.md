
## Flux

React 标榜自己是 MVC 里面 V 的部分，那么 Flux 就相当于添加 M 和 C 的部分。

Flux 是 Facebook 使用的一套前端应用的架构模式。

一个 Flux 应用主要包含四个部分：
1. the dispatcher (**处理动作分发**)
2. the stores(数据和逻辑部分)
3. the views(React 组件，这一层可以看作 controller-views，作为视图同时响应用户交互)
4. the actions(动作)

### 单向数据流

先来了解一下 Flux 的核心“单向数据流“怎么运作的：

```
Action -> Dispatcher -> Store -> View
```

![](https://hulufei.gitbooks.io/react-tutorial/content/image/flux-overview.png)

整个流程如下
- 首先要有 action，通过定义一些 action creator 方法根据需要创建 Action 提供给 dispatcher
- View 层通过用户交互（比如 onClick）会触发 Action
- Dispatcher 会分发触发的 Action 给所有注册的 Store 的回调函数
- Store 回调函数根据接收的 Action 更新自身数据之后会触发一个 change 事件通知 View 数据更改了
- View 会监听这个 change 事件，拿到对应的新数据并调用 setState 更新组件 UI

所有的状态都由 Store 来维护，通过 Action 传递数据，构成了如上所述的单向数据流循环，所以应用中的各部分分工就相当明确，高度解耦了。
这种单向数据流使得整个系统都是透明可预测的。

### Dispatcher(易)
本质上它就是 store callback 的 **注册表**，本身并没有实际的高度功能。它就是一个 **用来向stores分发actions** 的机器。 每一个 store 各自注册自己的 callback 以提供对应的处理动作。当 dispatcher 发出一个 action 时，应用中 **所有的store都会通过注册的callback收到这个action** 。

Dispatcher.js **提供的 API** (给其他模块使用)很简单

- register(function callback):  注册回调函数，返回一个string `token` 供在 waitFor() 使用
- unregister(string id):  通过 token 移除回调
- waitFor(array ids):  waitFor()的参数是一个包含了dispatcher注册索引的数组，这个索引通常被称之为dispatch tokens。因此store可以使用waitFor()来 **依赖其他的state**，以此来 **确定如何更新它自己的state**。
- dispatch(object payload):  在 action creator 中使用。用于动作产生后，分发动作的 payload（数据）给回调函数（相关 store 在 Dispatcher 中注册的）

dispatcher 只是一个粘合剂，剩余的 Store、View、Action 就需要按具体需求去实现了。

### Action（中）
Action 通过定义一些 action creator 方法来创建，这些方法用来暴露 **给外部调用**，从而创建新的动作。方法中使用了 AppDispatcher.dispatch，通过 dispatch 分发对应的动作，所以 action creator 也称作 dispatcher helper methods (辅助 dipatcher 分发)。

```js
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {
    create: function(text) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CREATE,
            text: text
        });
    },

    updateText: function(id, text) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_UPDATE_TEXT,
            id: id,
            text: text
        });
    },

    // 不带 payload 数据的动作
    toggleCompleteAll: function() {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
        });
    }
};
```

AppDispatcher 直接继承自 Dispatcher.js，在这个简单的例子中没有提供什么额外的功能。TodoConstants 定义了动作的类型名称常量。

类似 create、updateText 就是 action creator，这两个动作会通过 View 上的用户交互触发（比如输入框）。 除了用户交互会 **创建动作**(调用 action creator 即是在创建动作)，服务端接口调用也可以用来创建动作。

可以看到所谓动作就是用来 **封装传递数据的**，动作只是一个简单的对象，包含两部分：payload（数据，通过参数传递，动态变化的值）和 type（类型，在函数中声明，静态的值），type 是一个字符串常量，**用来标识动作**。

### Store（复杂）
> 下面说的回调函数是用来响应 action 的更新 store 的函数，注册在 dispatcher 中，

Stores 包含应用的 **状态和逻辑**，不同的 Store 管理应用中不同部分的状态。

store典型的特征就是既是models的集合，又是所属业务域下的model实例。

一个 store 大致包括以下三部分，两件事（在dispatcher中注册，广播 change 事件），要结合代码看看，代码的顺序是反过来shi'jian
1. store在dispatcher中注册，并提供相应的回调。
2. 回调会接收action并把它当成自己的一个参数。当action被触发，回调函数会使用switch语句来解析action中的type参数，并在合适的type下提供钩子来执行内部方法。**这就允许action通过dispatcher来响应store中的state更新**。
3. **store更新完成之后，会向应用中广播一个change事件**（在之前注册的回调函数末尾），views可以选择响应事件来重新获取新的数据并更新。

```js
// stores/TodoStore.js

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

// store
var TodoStore = assign({}, EventEmitter.prototype, {
    // Getter 方法暴露给外部获取 Store 数据
    getAll: function() {
        return _todos;
    },
    // 触发 change 事件
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    // 提供给外部 View 绑定 change 事件
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    }
});

// 定义一些数据处理方法
function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };
}
function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}

// 将动作注册到 dispatcher，通过动作类型过滤处理当前 Store 关心的动作
AppDispatcher.register(function(action) {
    var text;

    switch(action.actionType) {
        case TodoConstants.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text);
            }
            TodoStore.emitChange();
        break;

        case TodoConstants.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if (text !== '') {
                update(action.id, {text: text});
            }
            TodoStore.emitChange();
        break;
    }
});

```

### View

React提供了一种可组合式的view让我们可以自由组合展示层。在接近顶层的地方，**有些view需要监听所依赖的store的广播事件**。我们称之为controller-view，因为他们提供了胶水代码来从store中获取数据，并 **向下层层传递这些数据**(通过 setState)。

View 就是 React 组件，从 Store 获取状态（数据），绑定 change 事件处理。如

```js
var React = require('react');
var TodoStore = require('../stores/TodoStore');

function getTodoState() {
    return {
        allTodos: TodoStore.getAll(),
        areAllComplete: TodoStore.areAllComplete()
    };
}

var TodoApp = React.createClass({

    getInitialState: function() {
        return getTodoState();
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    render: function() {
        return <div>/*...*/</div>
    },

    _onChange: function() {
        this.setState(getTodoState());
    }
});

```
