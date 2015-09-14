## 常用的安装命令

$ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev


## gulp-ruby-sass和gulp-sass的区别
> 用 gulp-sass

通过查看依赖关系以及部分源码可以发现，gulp-ruby-sass和gulp-sass的区别就在于编译器的不同和编译过程不同。

gulp-ruby-sass是调用sass，所以需要ruby环境，需要生成临时目录和临时文件
gulp-sass是调用node-sass,有node.js环境就够了，编译过程不需要临时目录和文件，直接通过buffer内容转换。
