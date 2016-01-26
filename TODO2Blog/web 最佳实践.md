Web前端开发最佳实践

党建

2.5 Web前端代码开发和调试

图2-6　Chrome浏览器中的Developer Tools
2.5.3　Web前端性能分析
常用的Web前端性能分析工具有YSlow、PageSpeed及各浏览器自带的开发工具等。YSlow是由雅虎公司开发的一款免费工具，主要的特性有：基于不同的规则评定网站整体性能评分。
给出提高网页性能的建议。
统计页面加载的组件。
页面的统计信息视图。
相关性能分析的工具集，如JSLint、Smush.it等。

PageSpeed出自于Google公司，也是一款免费的工具，提供了在线工具和浏览器插件两种方式

Profiles中可以查看网页的CPU及内存占有情况报告，Audits中提供了各种资源和配置优化的建议和未使用CSS规则的列表

2.6 前端代码基本命名规范和格式规范

；属性值应该使用双引号闭合。

<img src="demo.jpg" alt="test" />

名称中全部使用小写，id名称中的关键词用下划线（_）连接，class的关键词用中划线（–）连接，这样可以最大限度地保证命名的不重复。

如果class名称仅作为JavaScript调用的“钩子”，则可在名称中添加“js”前缀。
示例代码：
<!--class名称仅作为JavaScript调用的"钩子"，可在名称中添加"js"前缀-->
<ul id="js_reader_menu">

<li class="menu-store js-active">Store

为了避免class命名的重复，命名时取父元素的class名作为前缀。

/* 父元素的样式声明 */
.reader-content {
...
}
/* 子元素的class名称以父元素中的class名称作为前缀 */
.reader-content-body {

而JavaScript中又经常包含HTML代码，所以字符串定义使用单引号也可方便于在字符串内部包含含有双引号的HTML代码。

3.4 停止使用不标准的标签和属性，简化HTML代码

不推荐在HTML标签中添加样式属性，如iframe、img、input、div等标签中的align属性，body标签上的background属性，td和tr标签上的height、width、nowrap、bgcolor、valign等属性，iframe标签中的frameborder、marginheight、scrolling等属性。此类属性应该废弃，并通过添加CSS样式来实现相同的效果。不推荐的示例如下：

3.7 添加必要的<meta>标签

<meta>标签放置在HTML页面的head中，主要用于标识网站

<meta>元素有4个属性：name、http-equiv、content和charset。<meta>标签通过name属性来表述页面文档的元信息，通过http-equiv属性设置HTTP请求指令，通过charset设置页面的字符编码

（1）name属性和content属性组合，构成名称/值对，用于描述网站信息

<meta name="keywords" content="british，typeface，font，fonts" />
此类型meta使用最广泛，其中keywords和description这两个名称的使用率最高，是搜索引擎优化的主要手段之一，推荐读者使用。设置keywords和description这两个meta时，尽量使用简洁和语义明确的词语

4.1 HTML语义化

<div>和<span>标签是最没有语义的两个标签
 
。如下的CSS样式可以实现文字的隐藏：
.reader-main-action li {
text-indent: -9999px;
}

编写高语义的HTML代码也是有一些最佳实践

（1）熟悉所有规范中的HTML标签，理解各标签的语义，在合适的地方使用合适的标签

<table>、<site>、<blockquote>

<section>、<nav>、<aside>

一个重要的属性是<label>标签中的for属性。<label>元素是给<input>元素定义的标注

也从语义上绑定了<label>元素和此表单元素

）给空标签中添加隐藏文字，用于说明标签的实际功能

。一般可通过设置text-indent来达到隐藏文字的目的。

4.2 如何设置网页标题层级

HTML5中新添加了一个标题标签<hgroup>，<hgroup>的具体用法可参考W3C制定的HTML5规范。

4.3 如何正确设计表单

要为<label>指定关联的输入控件，只需把相关控件的id赋值给<label>标签的for属性。

<form action="/service/user" method="post">
<fieldset>
<legend>Sign in to begin.</legend>
<label for="userName">User Name:</label>
<input type="text" id="userName" name="userName" />
<label for="password">Password:</label>
<input type="text" id="password" name="password" />
<input type="checkbox" id="staySigned" name="staySigned" />
<label for="staySigned">Stay signed in</label>
</fieldset>
<input type="submit" value="Login" />

</form>

默认情况下，使用<Tab>键切换的顺序会按照控件在界面上分布的顺序来处理，

5.1 HTML5新特性的使用

属性defer是在HTML 4.01规范中定义的，它表明<script>元素中包含的JavaScript代码并不会修改DOM结构，因此代码可以延迟执行

引用，就会以并行的方式下载脚本，而不是阻塞的方式下载

属性defer的作用是让脚本后置加载，相当于把脚本放置于页面最后面加载和执行。属性async的作用是让脚本异步加载和执行。两个属性的差别是：设置async属性后不能保证脚本按照顺序加载和执行，脚本加载完成后会立即执行

因此，如果脚本执行之间有依赖关系，则不能使用async属性

从功能上来说，可以使用async属性的场合也可以使用defer属性。因此，在设置async属性时，推荐同时设置defer属性，这样当浏览器不支持async属性时defer属性会起作用，从而最大限度地提高脚本加载执行的性能
注: 都不能被依赖。async 和 dom有关 defer和dom无关。

一般而言 库需要被阻塞，我们编写的一般不需要

head>
<base target="_blank">
</head>
属性target设置为_blank，单击页面上的超链接时会在新窗口打开。

）标签上的自定义属性data–*。

<ol>
<li id="byond_sea" data-length="2m11s">Beyond The Sea</li>
...
</ol>
对应的读取和设置数据的方式如下：
var beyondSea = document.getElementById('byond_sea');
// 获取数据
beyondSea.dataset['length'];
// 设置数据

div data-role="page" data-last-value="43" data-hidden="true" data-options='{"name":"John"}'></div>
$("div").data("role") === "page";
$("div").data("lastValue") === 43;
$("div").data("hidden") === true;
$("div").data("options").name === "John";

6.1 如何高效地组织CSS代码

规范的CSS代码首先应该具有结构清晰和模块分明的特点

，尽早规划和组织CSS代码的结构

首先是组织CSS代码文件。所有的CSS都可以分为两大类：通用类和业务类

其中样式文件default.css的作用是重置元素的默认样式，目的是让元素在各浏览器中有统一的外观。笔者使用的一个default.css版本结合了多个其他版本的重置样式定义，目前的版本基本稳定，已经在多个项目中得到了应用。下文将详细介绍样式重置的相关技术。

样式文件common.css中放置共通模块的样式和一些基础样式。共通模块包括页面对话框、提示框等共通组件的样式以及页面头部、底部、侧边栏等共通UI模块的样式

基础样式包括全局的页面布局设置、字体设置、背景和前景色等，也包括一些公有的class，这些公有class使用频繁，所以需要单独定义和使用，以提高代码的复用度。例如，常见的一个公有class是用来设置文字不可见的，代码如下：
.text-hide {
font: 0/0 a;
color: transparent;

text-shadow: none;
background-color: transparent;
border: 0
}

从直观的效果来看，页面布局分为头部、主体、尾部3个部分，则CSS样式文件至少也应该分割为3个。因此，在开发的开始阶段，按照对应的模块定义了3个CSS样式文件为：reader.header.css、reader.content.css和reader.footer.css。在开发的过程中，发现头部的图标按钮操作项对应的CSS样式内容太多，因此把这些操作项对应的样式独立了出来，定义了一个新的CSS样式文件：reader.header.action.css。样式文件经过这样的划分，结构清晰，方便了代码后续的开发和维护。

6.2 使用CSS Reset：统一浏览器显示效果

YUI中的方案只是重置了部分元素的margin和padding样式。来看看YUI中的方案：
body，div，dl，dt，dd，ul，ol，
li，h1，h2，h3，h4，h5，h6，pre，
code，form，fieldset，legend，
input，button，textarea，select，
p，blockquote，th，td {
margin: 0;
padding: 0;
}

代码片段来自YUI框架。
address，
caption，
cite，
code，
dfn，
em，
strong，
th，
var {
font-style:normal;
font-weight:normal;
}
h1，
h2，
h3，
h4，
h5，
h6 {
font-size:100%;
font-weight:normal;
}
abbr， acronym {
border: 0;
font-variant: normal;
}

input，
textarea，
select {
font-family:inherit;
font-size:inherit;
font-weight:inherit;
}
/*to enable resizing for IE*/
input，
textarea，
select {
*font-size:100%;
}
（4）其他元素的样式重置
列表元素一般会在每个列表项的前面添加小图标，但在实际项目中因为很少会使用这种默认的列表项样式，所以会重置列表项的样式，如下：
li {
list-style: none;
}
表格元素的样式重置的目的是重置单元格之间的默认空间，重置样式代码如下：
table {
border-collapse: collapse;
border-spacing: 0;
}

a:link， a:visited
{
text-decoration: none;
}

6.3 给CSS样式定义排序

把CSS属性分为7大类：显示与浮动（Diplay&Flow）、定位（Positioning）、尺寸（Dimensions）、边框相关属性（Margins、Padding、Borders、Outline）、字体样式（Typographic Styles）、背景（Backgrounds）、其他样式（Opacity、Cursors、Generated Content）

6.4 合理利用CSS的权重：提高代码的重用性

CSS样式的6种基础选择器：ID选择器（如#reader_title{}）、类选择器（如.reader-title{}）、属性选择器（如a[href="http:www.w3.org"]{}）、伪类和伪对象选择器（如:hover{}::after{}）、标签类型选择器（如a{}）以及通配选择器（如body*{}）。所有在CSS样式中定义的选择符都是由这6种基础选择符组合而成的，组合的方式也分为三种：后代选择符（如.reader.title{}）、子选择符（如.reader>.title{}）和相邻选择符（如.reader+.title{}）。

CSS权重指的是这些选择符的优先级，优先级高的CSS样式会覆盖优先级低的样式，优先级越高说明权重越高

定义选择符的原则是尽量使选择符的权重低，目的是保证样式在应用于多个元素时容易被覆盖，

原则。

（1）CSS样式中尽量不要使用ID选择器

如果使用了ID选择器就意味着此样式只作用于一个元素，

2）减少子选择器的层级

。Sass和Less是非常好的工具，可以很方便地管理CSS选择符的层级关系，但并不是说非要按照HTML结构层级关系写对应的CSS样式代码。在使用这两个工具时，还是要尽量让选择器的层级少，把通用的样式尽量提取出来，保证代码的最大量重用。
（3）使用组合的CSS类选择器

“多组合，少继承

6.6 em、px还是%

（1）尽量设置相对尺寸

这里重点指出的是局部的元素尺寸要尽量使用相对尺寸，即局部自适应，这样当整体模块的尺寸更改时就不需要更改模块内部子模块的尺寸了。

此外，在设置相对尺寸时是使用em还是百分比，也是有原则的。em是设置相对于字体大小的，如果期望尺寸随着字体的改变而改变，则应该使用em，如果期望尺寸随着父元素尺寸的改变而改变，则应该使用百分比。例如，设置行高一般使用em，而设置高度或者宽度则一般使用百分比。

（2）只有在可预知元素尺寸的情况下才使用绝对尺寸

。一般浏览器的默认字体大小为16px，可以显式地设置页面body元素的字体大小为16px，其他元素的字体大小使用em
注: 还不如直接rem

7.1 使用高效的CSS选择器

.references p.list div {
}

，实际上，CSS选择器的匹配原理和我们习惯的匹配过程是相反的，它是从右到左进行匹配的。

：首先查找所有的<div>标签元素，再查找元素是否存在具有list类的父元素，然后查找这些父元素是否为<p>标签元素，在已匹配的这些父元素中继续向上查找其父元素是否带有references类。理解这一原理非常重要，高效的选择器意味着浏览器匹配选择器时更快速，匹配查找次数更少

（1）避免使用通配符

如果使用了通配符，则匹配的计算量非常大。如果不是特殊的情况，建议不要使用通配符选择器。

（2）避免使用标签选择器及单个属性选择器作为关键选择器

在一个选择符中，最右边的选择器为关键选择器。关键选择器决定着浏览器初始匹配的元素数量，它也是整个选择符整体匹配次数的最主要决定者。

（4）尽量不要在选择符中定义过多的层级，最好不要超多三层

7.2 CSS相关的图片处理

1）不要设置图片的尺寸

。因此，在制作图片时，尽量按照实际需求的尺寸制作

1）在项目后期应用CSS Sprite技术

9.3 事件处理和业务逻辑分离

var setLightBoxPosition = function(top， left) {
var lb = scheduler._get_lightbox(); // 取得元素

// 设置元素位置
lb.style.top = top+"px";
lb.style.left = left+"px";
}

var move_while_dnd = function(e){
setLightBoxPosition(e.clientY， e.clientX);
};
在这段代码中，业务逻辑全部包含在setLightBoxPosition函数中，函数中的逻辑和事件处理没有任何的关联，也不依赖特定的事件处理，自然提高了代码的可维护性和可重用性。另外，业务逻辑和事件处理的分离，也有利于代码的自动化测试。测试代码不用模拟事件的触发，可以直接调用业务处理函数来测试业务逻辑是否正确
注: 这俩合起来就是业务层，应该把功能逻辑和事件分离

9.4 配置数据和代码逻辑分离

把这部分配置数据和业务逻辑分离

this.config = {
first_hour:0，
last_hour:24，
hour_size_px:42，
min_event_height:40
}

有部分框架同样把配置数据和逻辑给剥离开了，并且把这部分配置数据作为默认的配置数据，以方便框架使用者通过自定义配置数据来修改框架提供的默认数据

例如，在Bootstrap框架中，所有的控件都有一个默认的属性DEFAULTS，用于保存默认的配置数据。如下代码展示了Bootstrap框架中Tooltip控件的配置数据。
Tooltip.DEFAULTS = {
animation: true
， placement: 'top'
， selector: false
， template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
， trigger: 'hover focus'
， title: ''
， delay: 0
， html: false
， container: false
}

9.5 逻辑与结构样式分离

。最佳的做法是，在JavaScript代码中，仅仅是设置元素的Class

从服务器端动态获取HTML代码

将页面加载初始不需要加载的HTML代码从页面中分离，放置在单独的文件中。当需要显示这些内容时，再通过AJAX动态从服务器端获取，然后显示在页面上

如果页面中引用了jQuery框架，则使用jQuery中提供的方式更简单。
$('#store_container').load("content/templa

9.8 JavaScript模块化开发

模块就是指包含业务相关的方法和数据的组合

：CommonJS和AMD（Asynchronous Module Definition）。两者的主要差别在加载模块的方式上，在CommonJS规范中以同步的方式加载模块，在AMD规范中则是以异步方式加载模块。

AMD规范采用异步的方式加载模块，为了在加载时不影响后续的执行，在实现上使用了回调函数，将如上的代码写成AMD规范，就是如下的样子。
require('math'， function(math){
var add = math.add;
add(val， 1);
});
注: 但实际上通过处理依赖，打包的最终程序可以做到，被依赖代码在前，依赖代码在后

9.9 合理使用AJAX技术

实际上，了解原生的AJAX使用方法是很有必要的，了解原生的AJAX使用方法才能深入地理解AJAX原理，这样才能在没有使用任何框架或者并不需要使用框架的情况下，使用原生方法实现AJAX调用

如果用户在页面上做某些操作触发了一个AJAX请求，默认并不会立即有页面的响应。如果没有提供任何AJAX操作的反馈，可能会造成操作未响应的假象。为了提高用户的体验，有必要在进行AJAX操作的过程中给用户适当的反馈，让用户知道当前页面究竟在做什么样的操作、操作的结果如何等，防止用户重复操作。具体的方式有：在AJAX操作过程中禁用触发此操作的按钮、添加蒙版，或者在代码中添加表明正在操作中的标志位等，可防止用户重复操作，并且在操作过程中要有合适的页面提示，如添加一个加载动画等，告知用户操作进行中。AJAX操作完成后，如果操作失败，则要告知用户并提示用户后续的操作

第10章 高性能的JavaScript

默认情况下，在大部分浏览器中，JavaScript代码文件的加载和执行都是以阻塞方式进行的，并且浏览器是以单线程运行JavaScript代码和UI更新的，浏览器加载和运行JavaScript代码时会暂停页面上的其他响应。

10.1 加快JavaScript文件的加载速度

<script>标签定义了一个属性：defer，添加了这个属性，就是在告诉浏览器这个标签中包含的JavaScript代码不会产生任何的页面内容，因此浏览器可以在加载此引用时继续解析页面后续的内容，这样就不会阻塞页面的解析了。

如果期望所有的文件得以异步地加载和执行，而不受限于顺序，则可以使用<script>标签上的另外一个属性：async。添加了这个属性，则表明可以以异步的方式加载和执行JavaScript代码
注: 多个无依赖关系的js lib 可以添加async，以此加速性能

页面在初始加载时，很多的模块并不会立即使用到，只有在用户做了某些操作后才会使用到这些模块的功能。因此，很多时候，按需加载JavaScript文件对应的是功能模块的按需加载，模块化后的前端代码也最适合使用这种按需加载的方式。

推荐使用成熟的JavaScript加载框架，成熟的框架会仔细地处理好浏览器兼容问题，并且会有额外的一些功能。例如，可以使用HeadJS、RequireJS、LABjs等JavaScript模块加载框架。

10.2 养成良好的编码习惯，提高代码运行速度

嵌套循环时把大循环作为内循环、尽量避免循环内定义变量、在条件分支中创建只在分支中才需要用到的对象、使用直接量代替对象（如在JavaScript中之间使用数值、字符串、布尔值这三个原始类型而不是通过使用对应的Number、String、Boolean构造函数创建复杂对象）、缓存计算结果减少重复计算等。尤其是缓存计算结果，如果计算过程比较耗时，并且计算结果不会改变，则缓存计算结果可以大大提高性能
注: 都是好习惯，需牢记

（1）少用for-in循环
for-in循环提供了一种遍历对象属性的能力，但它的性能很差，应尽量使用for循环代替。另外，很多开发者把for-in用于对象的克隆，一个类似的示例如下：

但其实这是一个不好的做法，如果有大量的克隆操作，性能损耗是很大的。最佳的做法是在clone函数中明确复制每个属性，代码类似如下：
function clone(obj) {
if (null == obj || "object" != typeof obj) return obj;
var copy = obj.constructor();
copy.foo = obj.foo;
copy.bar = obj.bar;
return copy;
}

在代码中正确的做法是尽量释放不需要的对象，具体的方式如下：
尽量不使用全局变量，因为全局变量在页面的整个生命周期中不会被回收。
确保解除已经不需要的事件监听，如那些要移除的DOM对象上绑定的事件。
不要在闭包中返回外部不需要的对象。

10.3 使用高性能的变量或属性值读取方式

function update(){
var imgs = document.getElementsByTagName("img");
for(var i=0， len=imgs.length; i < len; i++){
imgs[i].title = document.title + " - image - " + i;
}
}
此函数运行时，要解析document变量，于是它先在函数局部查找，然后在外部作用域查找，直到在全局作用域中查找到了document定义为止。这种变量定义的查找会影响代码运行的性能，一个变量在作用域链上查找的层级越多则读取的速度就越慢，因此，函数中局部变量的访问是最快的，因为它是处在作用域链的最里层，而全局变量访问是最慢的

最好是将变量定义为本作用域的局部变量，尽量不要定义全局变量。如果需要频繁地访问一个外作用域的变量，最好是用一个局部变量保存外部变量，把多次的外部作用域变量访问变为一次外部作用域变量的访问。上面的例子中使用了多次相同的外部域变量，可以使用如下方式改写。
function update(){
var doc = document;
var imgs = doc.getElementsByTagName("img");
for(var i=0， len=imgs.length; i < len; i++){
imgs[i].title = doc.title + " - image - " + i;
}
}

和在作用域链上检索变量定义类似，在原型链上检索对象属性或方法也会影响性能，在原型链上检索的层级越多，性能越差，即使是读取在对象上直接定义的属性也比读取局部变量慢。因此，如果在代码中要频繁取得某个对象的属性值，尤其是此属性来自于对象的原型对象上时，最佳的做法是把属性值缓存在局部变量中，提高读取对象属性的性能。例如，下面的代码：
for (var i = 0; i < numbers.length; i++) {
numbers[i] *= 2;
}
在整个循环过程中，会反复读取numbers的length属性值，性能改进的方案是使用一个局部变量缓存此属性值，修改代码如下：
for (var i = 0， len = numbers.length; i < len; i++) {
numbers[i] *= 2;
}
注: 不过如果不是性能瓶颈一般不用这样写，当某段函数确实开销很大(n很大，复杂度也很大，或者耗时超过100ms)时，是需要考虑这样的优化的，否则不需要。

10.4 高效的DOM操作

DOM操作对性能影响最大其实还是因为它导致了浏览器的重绘（repaint）和重排（reflow）。

浏览器的渲染原理。从下载文档到渲染页面的过程中，浏览器会通过解析HTML文档来构建DOM树，解析CSS产生CSS规则树。JavaScript代码在解析过程中，可能会修改生成的DOM树和CSS规则树。之后根据DOM树和CSS规则树构建渲染树，在这个过程中，CSS会根据选择器匹配HTML元素。渲染树包括了每个元素的大小、边距等样式属性，渲染树中不包含隐藏元素及head元素等不可见元素。最后浏览器根据元素的坐标和大小来计算每个元素的位置，并绘制这些元素到页面上。重绘指的是页面的某些部分要重新绘制，比如颜色或背景色的修改，元素的位置和尺寸并没有改变；重排则是元素的位置或尺寸发生了改变，浏览器需要重新计算渲染树，导致渲染树的一部分或全部发生变化。渲染树重新建立后，浏览器会重新绘制页面上受影响的元素。重排的代价比重绘的代价高很多，重绘会影响部分的元素，而重排则有可能影响全部的元素。如下的这些DOM操作会导致重绘或重排。
增加、删除和修改可见DOM元素。
页面初始化的渲染。
移动DOM元素。
修改CSS样式，改变DOM元素的尺寸。
DOM元素内容改变，使得尺寸被撑大。
浏览器窗口尺寸改变。
浏览器窗口滚动。

现代浏览器会针对重排或重绘做性能优化，如把DOM操作积累一批后统一做一次重排或重绘。但在有些情况下，浏览器会立即重排或重绘。例如，请求下面的DOM元素布局信息：offsetTop/Left/Width/Height、scrollTop/Left/Width/Height、clientTop/

/Width/Height、getComputedStyle（）或currentStyle。因为这些值都是动态计算的，所以浏览器需要尽快完成页面的绘制，然后计算返回值

DOM操作带来的页面重绘或重排是不可避免的，但可以遵循一些最佳实践来降低由于重排或重绘带来的影响

1.合并多次的DOM操作为单次的DOM操作

element.style.borderColor = '#f00';
element.style.borderStyle = 'solid';
element.style.borderWidth = '1px';

element.className += 'empty';

类似的操作还有通过innerHTML接口修改DOM元素的内容。不要直接通过此接口来拼接HTML代码，而是以字符串方式拼接好代码后，一次性赋值给DOM元素的innerHTML接口

2.把DOM元素离线或隐藏后修改
把DOM元素从页面流中脱离或隐藏，这样处理后，只会在DOM元素脱离和添加时，或者是隐藏和显示时才会造成页面的重绘或重排，对脱离了页面布局流的DOM元素操作就不会导致页面的性能问题。这种方式适合那些需要大批量修改DOM元素的情况，具体的方式主要有以下3种。

var myElement = document.getElementById('myElement');
myElement.style.display = 'none';
// 一些基于myElement的DOM操作
...
myElement.style.display = 'block';

在现代的浏览器中，因为有了DOM操作的优化，所以应用如上的方式后可能并不能明显感受到性能的改善。但是在仍然占有市场的一些旧浏览器中，应用以上这3种编码方式则可以大幅提高页面渲染性能。

3.设置具有动画效果的DOM元素的position属性为fixed或absolute
把页面中具有动画效果的元素设置为绝对定位，使得元素脱离页面布局流，从而避免了页面频繁的重排，只涉及动画元素自身的重排了

for (var i=0; i < len; i++) {
myElements[i].style.top = targetElement.offsetTop + i*5 + 'px';
}
如上的代码中，会在一个循环中反复取得一个元素的offsetTop值，事实上，在此代码中该元素的offsetTop值并不会变更，会存在不必要的性能损耗。优化的方案是在循环外部取得元素的offsetTop值，相比较之前的方案，此方案只是调用了一遍元素的offsetTop值。更改后的代码如下：
var targetTop = targetElement.offsetTop;
for (var i=0; i < len; i++) {
myElements[i].style.top = targetTop+ i*5 + 'px';
}
另外，因为取得DOM元素的布局信息会强制浏览器刷新渲染树，并且可能会导致页面的重绘或重排，所以在有大批量DOM操作时，应避免获取DOM元素的布局信息，使得浏览器针对大批量DOM操作的优化不被破坏。如果需要这些布局信息，最好是在DOM操作之前就取得。考虑如下一个示例：
var newWidth = div1.offsetWidth + 10;
div1.style.width = newWidth + 'px';

var newHeight = myElement.offsetHeight + 10; // 强制页面重排
myElement.style.height = newHeight + 'px';

代码在遇到取得DOM元素的信息时会触发页面重新计算渲染树，如上的代码会导致页面重排两次，如果把取得DOM元素的布局信息提前，因为浏览器会优化连续的DOM操作，所以实际上只会有一次的页面重排出现

var newWidth = div1.offsetWidth + 10;
var newHeight = myElement.offsetHeight + 10;

div1.style.width = newWidth + 'px';
myElement.style.height = newHeight + 'px';

页面中元素绑定的事件越多，占用的处理时间和内存就越大，性能也就相对越差，因此，在页面中绑定的事件越少越好。一个优雅的手段是使用事件托管方式，即利用事件冒泡机制，只在父元素上绑定事件处理，用于处理所有子元素的事件，在事件处理函数中根据传入的参数判断事件源元素，针对不同的源元素做不同的处理。这样就不需要给每个子元素都绑定事件

// 获取父节点，并添加一个click事件
document.getElementById('list').addEventListener("click"，function(e) {
// 检查事件源元素
if(e.target && e.target.nodeName.toUpperCase == "LI") {
// 针对子元素的处理
...
}
});

10.5 使用辅助工具优化JavaScript代码性能

很多性能检查工具也会检查代码文件的加载情况，并给出有价值的建议，如压缩代码、合并代码、调整代码加载顺序、延迟加载代码等。这类工具有PageSpeed、YSlow等。这类工具会从网页整体上进行检查，而并不是仅仅检查JavaScript代码文件

查看页面DOM事件、重绘或重排及实时内存占有等情况时，则可以使用Chrome浏览器开发工具中的Timeline工具栏

；如果在Timeline中显示的内存占有情况异常，则要仔细检查内存溢出。Profile工具栏在这个时候就派上了用场，Profile工具具有更细粒度的代码分析能力，能分析每个函数调用所占有的资源情况，可极大地辅助开发者定位有问题的代码

如上的工具仅仅针对网页中加载的JavaScript，如果想优化某个JavaScript代码片段的性能，则可以使用在线的代码性能对比工具，如使用jsPerf。开发者可以在jsPerf上在线编辑和运行代码片段，得到浏览器运行的性能信息。这个工具最大的优势是可以同时对比多段代码的性能差异。图10-9是对比两段代码后得出的性能比较结果。

11.1 常见的Web前端攻击方式

XSS是Cross Site Scripting的缩写，即跨站点脚本攻击。XSS发生在用户的浏览器端，即当用户在加载HTML文档时执行了非预期的恶意脚本。这些恶意的脚本一般来自于第三方域，带有一定的危害性，恶意脚本的执行会导致用户敏感数据的泄露或者诱导用户错误操作

总结XSS攻击的特点就是：尽一切办法在目标网站上执行非目标网站上原有的脚本。

CSRF是Cross Site Request Forgery的缩写，译为跨站请求伪造

对CSRF来说，请求是来源于其他网站的，即为跨站的请求。并且这个请求并不是来自于用户的意愿，而是伪造的请求，诱导用户发起的请求。如下是一个CSRF攻击的典型过程。

界面操作劫持是最近几年才大量出现的Web前端攻击方式

界面操作劫持是利用视觉欺骗，诱导用户操作

中覆盖一个不可见的框（如一个不可见的iframe），用户点击输入框时，其实是点击了不可见框中的内容，从而让用户做出了一些非自己意愿的操作。这些操作有可能造成用户敏感信息的泄露、数据丢失等

11.2 不要轻易信任任何外部传入的数据

防范Web前端攻击的一个重要的常识是：永远也不要轻易相信用户输入的数据

只要在所有的这些入口添加必要的输入校验和过滤即可

如果项目中使用了jQuery框架，那么以上的编码过滤操作就会变得简单多了，jQuery内置的DOM操作接口已经针对输入的内容做了相应的编码处理，比如，显示用户输入的内容时使用$（'...'）.text（data）而非$（'...'）.html（data）、使用$（'...'）.attr（）添加属性、使用$（'...'）.css（）添加样式等。

11.3 其他前端安全防范实践

在网站中使用JavaScript操作Cookie是一种不安全的做法，如果遇到需要通过此方式来传递和保存数据的情况，就应该尝试使用其他更安全的代替方案，比如使用HTML5中的LocalStorage。

12.1 移动Web前端开发概述

流式布局和固定布局是相对的，流式布局的核心思想是使用百分比来设置页面各部分的宽度，而固定布局是指页面主要模块使用了固定的宽度。

8）使用工具检查网页的移动设备兼容性

推荐的工具有MobiReady、W3C mobileOK Checker、iPadPeek和Google公司发布的Howtogomo。iPadPeek是一个很直观的工具，让用户输入测试网址，直接在页面上展示所测试网址的实际展示效果。Howtogomo除了显示移动设备上的截屏之外，还会给出兼容移动设备的修改建议。

移动端网站的域名一般是选取桌面端网站域名的二级域名。二级域名的名称建议选取mobile或者m。例如，桌面端网站的网址为www.sample.com，则移动端网站的网址选择m.sample.com或者mobile.sample.com。如果在移动智能设备的浏览器中输入桌面端主网站的网址，应该要自动跳转到移动端的网站，但同时在桌面端网站和移动端网站上提供相互的网站链接，从而给用户提供更多的网站体验。

（3）设计移动站点为单页模式，避免页面跳转

12.2 移动Web前端开发相关技术最佳实践

（3）谨慎使用Timer

在PC端的前端开发中，经常会使用setInterval（）和setTimeout（）这两个函数来完成一些多个或单次的定时任务。这些任务运行时界面上并不会有任何的体现，属于后台任务。在大部分的智能设备中，当页面处于隐藏状态（即用户点击了返回主菜单，或者打开其他应用，或者浏览器中打开了新的tab，或者智能设备屏幕关闭）时，正在浏览的页面会处于锁定状态，页面中的JavaScript代码会停止执行

即使JavaScript代码能正常执行，页面中Timer的行为也可能会有问题。例如，在使用setInterval（）时，如果时间设置间隔小于1秒，则在移动设备上运行时，并不一定会按照预期设定的时间执行Timer任务，而是比设定时间长。有些老旧移动设备甚至不执行任何小于1秒的Timer任务。因此，在移动Web开发中，要避免使用Timer来完成需要准确控制时间的任务。
