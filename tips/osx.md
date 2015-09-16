## fish
推荐这四个theme
- beloglazov
- robbyrussell 不显示时间
- russell 显示时间
- scorphish

## homebrew
超多超级棒的 homebrew 那下的osx的 quickview（空格就可以快速预览）插件 https://github.com/sindresorhus/quick-look-plugins

open .
say
flux


## 命令行代理
偶然在一篇文章上发现了curl、wget等http应用程序会调用http_proxy和https_proxy这两环境变量进行代理，于是我就尝试设置一下：

> 注意 下文的 http://127.0.0.1:8087  为代理端口，一定要根据自己代理的填

export http_proxy=http://127.0.0.1:8087
export https_proxy=$http_proxy
PS：别用ping对以上代理进行测试，不管用。

试着重新安装vim7.4，果然不再被墙，成功下载了！并且在goagent的log上也可以观察到：

INFO - [Apr 8 16:13:33] 127.0.0.1:60865 "GAE GET http://luajit.org/download/LuaJIT-2.0.3.tar.gz HTTP/1.1" 206 271735
这说明brew的curl确实使用了我刚才设置的代理。

大伙可以在~/.zshrc或者~/.bash_profile or ~/.config/fish/config.fish 中添加这样的alias：

alias goproxy='export http_proxy=http://127.0.0.1:8087 https_proxy=http://127.0.0.1:8087'
alias disproxy='unset http_proxy https_proxy'
