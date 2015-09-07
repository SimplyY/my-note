## map
> 类似于py 的列表推导

```js
//eg1:

var numbers = [1, 4, 9];
var doubles = numbers.map(function(num) {
  return num * 2;
});
// doubles is now [2, 8, 18]. numbers is still [1, 4, 9]

// eg2:
var map = Array.prototype.map;
var a = map.call('Hello World', function(x) { return x.charCodeAt(0); });
// a now equals [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]

// or
var a = [].map.call('Hello World', function(x) { return x.charCodeAt(0); });
```
