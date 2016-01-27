# css
## HTML

### 文本用闭合标签

闭合标签的基本格式如下:<标签名>文本内容</标签名>

比如

```html
<h1>Words by Dogsworth</h1>
<p>I wandered lonely as a dog.</p>
```

### 引用内容用自闭合标签
浏览器会在 HTML 页面加载的时候,额外向服务器发送请求,以取得自闭 合标签引用的内容。

下面就是使用自闭合标签标记的一张图片。

```html
<img src="images/cisco.jpg" alt="My dog Cisco" />
```

对于自闭合标签,XHTML 要求必须这样写:
<img src="images/cisco.jpg" alt="My dog Cisco" /> 而在 HTML5 中,可以省略最后那个表示关闭的斜杠,写成:
<img src="images/cisco.jpg" alt="My dog Cisco" >
不过,我还是习惯于给自闭合标签的末尾也加上一个空格和斜杠。HTML5 会忽略这个斜杠,而 我在检查代码结构时,通过它一眼就能知道 **这个标签已经关闭了**,所以它不包含后面的标签。

### section
只有元素内容会被列在 **文档大纲** 中时，才适合用section元素。

这里的文档大纲更像是提纲，section 就是提纲中的不重复项（比如对于博文 list，整个 list 才属于一个 section）

### 块级元素和行内元素
- 块级元素盒子会扩展到与父元素同宽
- 行内元素盒子会“收缩包裹”其内容,并且会尽可能包紧。

## 选择符
### 后代选择符
标签 1 标签 2 {声明}

是其祖先元素(不一定是父元素)的情况下才会被选中。

### 子选择符>
标签 1 > 标签 2

标签 1 必须是标签 2 的父元素,标签 1 不能是标签 2 的父元素之外的其他 祖先元素。

### 紧邻同胞选择符+
标签 1 + 标签 2

标签 2 必须紧跟在其同胞标签 1 的后面。

### 一般同胞选择符~
标签 1 ~ 标签 2

标签 2 在其同胞标签 1 后面(不一定紧跟)。

### 标签带类选择符
p.specialtext {color:red;}

只选择带 specialtext 类的段落。像这样组合标签 名和类选择符,可以让你更精确地选择特定的标签。

### 多类选择符
<p class="specialtext featured"></p>

选择同时存在这两个类名的元素,可以这样写:
.specialtext.featured {font-size:120%;}

注意,CSS 选择符的两个类名之间没有空格,因为我们只想选择同时具有这两个类
名的那个元素。如果你加了空格,那就变成了“祖先/后代”关系的上下文选择符了。

只用一个 class 属性,但给它设定多个值，达到组合的效果。

### 属性选择符
标签名[属性名] 选择任何带有属性名的标签名。

比如,下面的 CSS

img[title] {border:2px solid blue;}

会导致像下面这个带有 title 属性的 HTML img 元素显示 2 像素宽的蓝色边框