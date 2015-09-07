
## 进程
ps
显示当前软件的所有进程

最常用的方法是ps aux,然后再通过管道使用grep命令过滤查找特定的进程,然后再对特定的进程进行操作。
    ps aux | grep program_filter_word,ps -ef |grep tomcat

终止进程
kill -9 pid
选项：-9  强行终止进程
