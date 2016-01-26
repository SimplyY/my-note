## 安装
由于有墙，国内安装步骤如下

```
➜ ~ gem -v
2.4.5
➜ ~ gem sources --remove https://rubygems.org/
https://rubygems.org/ removed from sources
➜ ~ gem sources -a https://ruby.taobao.org/
https://ruby.taobao.org/ added to sources
➜ ~ gem sources -l
*** CURRENT SOURCES ***

https://ruby.taobao.org/
➜ ~ gem install sass
```

## 使用
`sass test.scss`

### 编译风格
SASS提供四个编译风格的选项：
* nested：嵌套缩进的css代码，它是默认值。
* expanded：没有缩进的、扩展的css代码。
* compact：简洁格式的css代码。
* compressed：压缩后的css代码。

### 监听
> very useful

- 让SASS监听某个文件或目录，一旦源文件有变动，就自动生成编译后的版本。
- 这样以来就可以编辑 sass 并且自动编译，再在浏览器上面看效果了。

```
// watch a file
sass --watch input.scss:output.css
// watch a directory
sass --watch app/sass:public/stylesheets
```

## 基本语法
注意有两种语法（唯一的不同就是大括号和分号）
### SASS SYNTAX
```
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```
### SCSS SYNTAX
```
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```
#### 支持变量
```
$side: left;
.rounded {
　　border-#{$side}-radius: 5px;
}
```

并且允许计算

### 嵌套
```
div {
　　　　hi {
　　　　　　color:red;
　　　　}
　　}
```

并且支持属性嵌套

```
p {
　　border: {
　　　　color: red;
　　}
}
```

使用&引用父元素

```
a {
　　&:hover { color: #ffb3ff; }
}

```

###  注释
1. `/* comment */` ，会保留到编译后的文件。
2. `// comment`，只保留在SASS源文件中，编译后被省略。
3. `/*`后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。

## 高级技巧
### 继承
class2要继承class1，就要使用@extend命令：

```
class1 {
　　border: 1px solid #ddd;
}
.class2 {
　　@extend .class1;
}
```

### Mixin
> 类似于宏，定义可以重用的代码块。

```
@mixin left {
　　float: left;
　　margin-left: 10px;
}

div {
　　@include left;
}
```

mixin的强大之处，在于可以指定参数和缺省值。

```
@mixin left($value: 10px) {
　　float: left;
　　margin-right: $value;
}
div {
　　@include left(20px);
}
```

下面是一个mixin的实例，用来生成浏览器前缀。(大法好)

```
@mixin rounded($vert, $horz, $radius: 10px) {
　　border-#{$vert}-#{$horz}-radius: $radius;
　　-moz-border-radius-#{$vert}#{$horz}: $radius;
　　-webkit-border-#{$vert}-#{$horz}-radius: $radius;
}
```

### 插入文件
`@import "path/filename.scss";`

### 支持 if, for, while, each, function
```
@if lightness($color) > 30% {
　　background-color: #000;
} @else {
　　background-color: #fff;
}


@for $i from 1 to 10 {
　　.border-#{$i} {
　　　　border: #{$i}px solid blue;
　　}　
}

@each $member in a, b, c, d {
　　.#{$member} {
　　　　background-image: url("/image/#{$member}.jpg");
　　}
}

@function double($n) {
　　@return $n * 2;
}
#sidebar {
　　width: double(5px);
}

```
