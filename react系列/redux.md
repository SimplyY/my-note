## 参考链接
https://hulufei.gitbooks.io/react-tutorial/content/redux-basic.html
es6

## 进化 Flux
通过对比 Redux 和 Flux 的实现来感受一下 Redux 带来的惊艳。

首先是 action creators，Flux 是直接在 action 里面调用 dispatch：
```js
export function addTodo(text) {
    AppDispatcher.dispatch({
        type: ActionTypes.ADD_TODO,
        text: text
    });
}
```

Redux 把它简化成了这样：

```js
export function addTodo(text) {
    return {
        type: ActionTypes.ADD_TODO,
        text: text
    };
}
```

这一步把 dispatcher 和 action 解藕了，很快我们就能看到它带来的好处。
接下来是 Store，这是 Flux 里面的 Store：

```js
let _todos = [];
const TodoStore = Object.assign(new EventEmitter(), {
    getTodos() {
        return _todos;
    }
});
AppDispatcher.register(function (action) {
    switch (action.type) {
    case ActionTypes.ADD_TODO:
        _todos = _todos.concat([action.text]);
        TodoStore.emitChange();
        break;
    }
});
export default TodoStore;

// Redux 把它简化成了这样：
const initialState = { todos: [] };
export default function TodoStore(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.ADD_TODO:
        return { todos: state.todos.concat([action.text]) };
    default:
        return state;
}
```
同样把 dispatch 从 Store 里面剥离了，Store 变成了一个 pure function：(state, action) => state

所以现在 Store **不再拥有状态，而只是管理状态**，所以首先要明确一个概念，Store 和 State 是有区别的，Store 并不是一个简单的数据结构，State 才是，Store 会包含一些方法来管理 State，比如获取／修改 State。
基于这样的 Store，可以做很多扩展，这也是 Redux 强大之处。

## Redux 的基础概念
### 三个基本原则
- 整个应用只有唯一一个可信数据源(Store)
- State 只能通过触发 Action 来更改
- **State 的更改** 必须写成纯函数(Reducer)，也就是每次更改总是返回一个新的 State

### 看图说话
![](http://7xkpdt.com1.z0.glb.clouddn.com/34ac9de05c0ad25b3bec202a067a618a.png)

先不看初始化

#### 基本概念
- 图中的 dispatch 是 store.dispatch(action), 也就是分发一个 action
- reducer 则是管理 state, 也就是 `(oldState, action) => newState` 的集合。当 action 被分发，就会由 reducer 根据 action 的类型来调用对应的 `(oldState, action) => newState` 。
- listener 则是回调函数，当 state 改变的时候被调用。其中 listenner 很有可能会对 view 做改变。
- view 即 react， 会在最后说如何将 redux 和 react 联合使用。

#### 初始化过程
1. 使用 reducer 去 createStore
2. 然后用返回的 store 去 subscribe listenner

这样一来，subscribe 后就可以 dispatch(action)了，

### Actions
Action 很简单，就是一个单纯的包含 { type, payload } 的对象，type 是一个常量用来标示动作类型，payload 是这个动作携带的数据。

一般来说，会使用函数（Action Creators）来生成 action，这样会有更大的灵活性，Action Creators 是一个 pure function，它最后会返回一个 action 对象：

```js
function addTodo(text) {
    return {
        type: 'ADD_TODO',
        text
    }
}
```

Redux 的 action 与 Flux 中的类似，都是表达 view 要改变 store 内容的载体。Flux 是通过统一的 Dispatcher 分发 action，Redux 去除了这个 Dispatcher，使用 store 的 store.dispatch() 方法来把 action 传给 store。

### Reducers

Reducer 用来处理 Action 触发的对状态树的更改。

所以一个 reducer 函数会接受 oldState 和 action 两个参数，返回一个新的 state：`(oldState, action) => newState`。一个简单的 reducer 可能类似这样：

```js
const initialState = {
    a: 'a',
    b: 'b'
};

function someApp(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_A':
            return { ...state, a: 'Modified a' };
        case 'CHANGE_B':
            return { ...state, b: action.payload };
        default:
            return state
    }
}
```

值得注意的有两点：

- 我们用到了 object spread 语法 确保不会更改到 oldState 而是返回一个 newState
- 对于不需要处理的 action，直接返回 oldState

Reducer 也是 pure function，这点非常重要，所以绝对不要在 reducer 里面做一些引入 side-effects 的事情，比如：

- 修改 state 参数对象
- 请求 API
- 调用不纯的函数，比如 Data.now() Math.random()

### 拆分 reducer
因为 Redux 里面只有一个 Store，对应一个 State 状态，所以整个 State 对象就是由一个 reducer 函数管理，但是如果所有的状态更改逻辑都放在这一个 reducer 里面，显然会变得越来越巨大，越来越难以维护。

得益于纯函数的实现，我们只需要稍微变通一下，让状态树上的每个字段都有一个 reducer 函数来管理就可以拆分成很小的 reducer 了：

```js
function someApp(state = {}, action) {
    return {
        a: reducerA(state.a, action),
        b: reducerB(state.b, action)
    };
}
```

对于 reducerA 和 reducerB 来说，他们依然是形如：`(oldState, action) => newState` 的函数，只是这时候的 state 不是整个状态树，而是树上的特定字段，每个 reducer 只需要判断 action，管理自己关心的状态字段数据就好了。

Redux 提供了一个工具函数 combineReducers 来简化这种 reducer 合并：

```js
import { combineReducers } from 'redux';

const someApp = combineReducers({
    a: reducerA,
    b: reducerB
});
```

像 someApp 这种管理整个 State 的 reducer，可以称为 root reducer。


### Store

现在有了 Action 和 Reducer，Store 的作用就是连接这两者，Store 的作用有这么几个：

- Hold 住整个应用的 State 状态树
- 提供一个 getState() 方法获取 State
- 提供一个 dispatch() 方法发送 action 更改 State
- 提供一个 subscribe() 方法注册回调函数监听 State 的更改

创建一个 Store 很容易，将 root reducer 函数传递给 createStore 方法(redux 已经帮我们实现)即可：

```js
import { createStore } from 'redux';
import someApp from './reducers';
let store = createStore(someApp);

// 你也可以额外指定一个初始 State（initialState），这对于服务端渲染很有用
// let store = createStore(someApp, window.STATE_FROM_SERVER);
```

现在我们就拿到了 store.dispatch，可以用来分发 action 了：

```js
// some callback as subscribe() param, will be used when reducers retren new state
let unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch
store.dispatch({ type: 'CHANGE_A' });
store.dispatch({ type: 'CHANGE_B', payload: 'Modified b' });

// Stop listening to state updates
unsubscribe();
```


### Data Flow

以上提到的 store.dispatch(action) -> reducer(state, action) -> store.getState() 其实就构成了一个“单向数据流”，我们再来总结一下。

#### 1. 调用 store.dispatch(action)
Action 是一个包含 { type, payload } 的对象，它描述了“发生了什么”，比如：

```js
{ type: 'LIKE_ARTICLE', articleID: 42 }
{ type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
{ type: 'ADD_TODO', text: 'Read the Redux docs.' }
```

#### 2. Action 会触发给 Store 指定的 root reducer

root reducer 会返回一个完整的状态树，State 对象上的各个字段值可以由各自的 reducer 函数处理并返回新的值。

- reducer 函数接受 (state, action) 两个参数
- reducer 函数判断 action.type 然后处理对应的 action.payload 数据来更新并返回一个新的 state

#### 3. Store 会保存 root reducer 返回的状态树
新的 State 会替代旧的 State，然后所有 store.subscribe(listener) 注册的回调函数会被调用，在回调函数里面可以通过 store.getState() 拿到新的 State。

这就是 Redux 的运作流程，接下来看如何在 React 里面使用 Redux。

## MVC vs flux（redux）
### MVC
以前的 MVC，模型与视图间可能存在的双向数据流动（省略了 C）：
- 比如 viewA、viewB 共享一个 modelA
- 在 viewA 里 change 了 modelA (数据流: viewA -> modelA)
- viewB 里要响应 modelA 的 change，也 change(数据流: modelA -> viewB)

于是乎这个时候MVVM 就出现了。但是数据流仍然是 **双向** 的。

### flux（redux）
而 flux 则重新发明了 MVC，将MVC 的双向数据流，变成单向数据流。

思考了几天，原来 flux 和 redux 其实就是，把 MVC 的 MC 层分成了三层：
- 一层是用来改变 M（即state） 的方法集合，在 redux 里为 reducer。数据流：  reducer -> store
- 还有一层则是 store。在 redux 里是，用来保存改变了的 state、state 改变后要调用的回调函数(listener)，这俩一起完成数据流 store -> view。
- 最后一层是 store 的 dispatch 方法分发的 action ，作为数据流的起点，去调用相应改变 state 的方法，(view or others' dispatch)action -> reducer。

也就是永远是 action -> reducer -> store -> view 的单向数据流。


## 在 React 应用中使用 Redux

和 Flux 类似，Redux 也是需要注册一个回调函数 store.subscribe(listener) 来获取 State 的更新(tore.getState() 拿到新的 State)，然后我们要在 listener 里面调用 setState() 来更新 React 组件。

Redux 官方提供了 [react-redux](https://github.com/rackt/react-redux) 来简化 React 和 Redux 之间的绑定，不再需要像 Flux 那样手动注册／解绑回调函数。
### react-redux
本库深受 **分离容器组件和展示组件** 思想启发。

在应用中，只有 **最顶层组件是对 Redux 可知**（例如路由处理）这是很好的。所有它们的子组件都应该是“笨拙”的，并且是通过 props 获取数据。

|            | 容器组件              | 展示组件              |
|:-----------|:----------------------|:----------------------|
| 位置       | 最顶层，路由处理      | 中间和子组件          |
| 使用 Redux | 是                    | 否                    |
| 读取数据   | 从 Redux 获取 state   | 从 props 获取数据     |
| 修改数据   | 向 Redux 发起 actions | 从 props 调用回调函数 |

### 不使用 Redux 的展示组件

让我们看下，我们拥有一个 <Counter /> 的展示组件，它有一个通过 props 传过来的值，和一个函数 onIncrement，当你点击 “Increment” 按钮时就会调用这个函数：

```js
import { Component } from 'react';

export default class Counter extends Component {
  render() {
    return (
      <button onClick={this.props.onIncrement}>
        {this.props.value}
      </button>
    );
  }
}
```

### 容器组件使用 connect() 方法连接 Redux
我们用 react-redux 提供的 connect() 方法为“笨拙”的 Counter 添加一个 **容器组件**。connect() 允许你从 Redux store 中指定准确的 state 到想要获取 state 的组件中。这让你能获取到任何级别颗粒度的数据。

使用方法，**将 redux 的 state 和（要 dispatch 的）action 映射到组件的 props** 里即可，这样以来，就完成了 redux 到 react 的数据流的部署（state -> props，action -> props(event)）。

实现时需要俩函数 mapStateToProps、mapDispatchToProps 作为 connect 的参数，具体代码如下。

```js
// containers/CounterContainer.js

import { Component } from 'react';
import { connect } from 'react-redux';

import Counter from '../components/Counter';
import { increment } from '../actionsCreators';

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
    return {
        value: state.counter
    };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
    return {
        onIncrement: () => dispatch(increment())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```



### 注入 Redux Store

最后，我们实际上是怎么连接到 Redux store 的呢？我们需要在 **根组件中创建这个 store**。对于客户端应用而言，根组件是一个很好的地方。对于服务端渲染而言，你可以在处理请求中完成这个。

关键是从 React Redux 将整个视图结构 **包装进 <Provider>**。

```js
import ReactDOM from 'react-dom';
import { Component } from 'react';
import { Provider } from 'react-redux';

class App extends Component {
    render() {
        // ...
    }
}

const targetEl = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    targetEl
);
```
