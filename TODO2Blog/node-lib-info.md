## node test
### mocha
> JavaScript test framework  for node.js and the browser
http://mochajs.org/

describe 中的字符串，用来描述你要测的主体是什么；it 当中，描述具体的 case 内容。

Example
```js
var assert = require("assert");
describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {

      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});
```

![](https://raw.githubusercontent.com/alsotang/node-lessons/master/lesson6/2.png)

### should
> 断言库 should  
BDD-style assertions

https://github.com/shouldjs/should.js

Example
```js
var should = require('should');

var user = {
    name: 'tj'
  , pets: ['tobi', 'loki', 'jane', 'bandit']
};

user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(4);

// If the object was created with Object.create(null)
// then it doesn't inherit `Object.prototype`, so it will not have `.should` getter
// so you can do:
should(user).have.property('name', 'tj');

// also you can test in that way for null's
should(null).not.be.ok();

someAsyncTask(foo, function(err, result){
  should.not.exist(err);
  should.exist(result);
  result.bar.should.equal(foo);
});
```

### supertest
> HTTP assertions made easy via super-agent.

https://github.com/visionmedia/supertest

Example
```js
var request = require('supertest')
  , express = require('express');

var app = express();

app.get('/user', function(req, res){
  res.send(200, { name: 'tobi' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '20')
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
  });
```


## node

### nodemon
实时监控 node 文件，比如服务器配置文件。
