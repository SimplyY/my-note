## 使用技巧
cmd 在 win 下对应为 ctrl


### 命令行下用atom打开
atom + 文件or文件夹名

### 关闭侧边栏
'.platform-darwin':
  'cmd-\': 'tree-view:toggle'

### 分屏
osx: cmd + k， 加 方向键
win: ctrl + k, + 方向键

### 多光标编辑
cmd 或者 ctrl + 鼠标左键

### 文件
cmd + p 在项目内打开任何文件
cmd + w 关闭当前文件


### 查找
支持正则匹配

cmd + f 项目内查找

cmd + shift + f 项目内查找
如图，大法好

![image](https://cloud.githubusercontent.com/assets/8455579/9791443/abf90bbc-580d-11e5-8759-dcb7d9efb58c.png)

### 换行长度
在 setting 里面（cmd + , 打开）可以设置默认 preferred line length，在各个语言的 packgage 里面可以针对不同语言设置不同的 length

### 自定义 snippet，keymap
在 setting 里点击 open config folder ,在keymap.cson,snippet.cson 里自定义


## packages
> 有的时候更新和下载 package atom 会卡，可以用命令行的 apm 替代

使用 package 的步骤：
1. install it
2. read readme
3. set its setting （if it has setting）
4. run it（or look it）

### amazing package
1. color-picker
2. pigment(A package to display colors in project and files)
4. browser-refresh(win) or browser-refresh-on-save(osx)
5. file-icons(让你拥有高颜值的图标)
6. Markdown Writer(在设置里面设置一下，就拥有了编辑 md 文件的各种快捷键)
7. Markdown-assistant(upload image in md)
7. atomicChar 解决了atom中文换行显示问题
7. Atom Ternjs (js 补全)
7. merge-conflicts (再也不怕 git 的合并冲突了，分分钟解决 conflicts)
8. activate-power-mode

### very useful package
1. Atom Beautify（格式化代码）
2. open-html-in-browser
3. project-manager
4. foldername-tabs
5. minimap
6. highlight-column and highlight-selected
8. fold-functions
8. indent-guide-improved(给 indent guide改颜色)
9. tag


### useful package
1. Timecop(假如你的 atom 开

    启速度慢了，看看这个)
2. htmlhint
3. jshint
4. jqurey-snippets
5. javascript-snippets
6. todo-show
9. line-count


### 代码段

有很多好用的代码段是为快速编写Markdown准备的。

如果你输入img之后按下tab，你会得到像![]()这样的Markdown格式的图片代码。如果你输入table之后按下tab，你会得到一个非常棒的用于填充的示例表格。

| Header One     | Header Two     |
| :------------- | :------------- |
| Item One       | Item Two       |
虽然用于Markdown的代码段不多（b粗体，i斜体，code代码块，等等），它们会节省你用于寻找模糊的语法的时间。另外，你可以按下alt-shift-S，来寻找当前文件类型可用的代码段列表。

#### 自定义代码段
可以在 config 文件夹里面的 snippts 里自定义 你自己的补全。
