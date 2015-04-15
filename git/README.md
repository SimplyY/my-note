笔记
===
git笔记
-----


新建软件仓库步骤
----
为了直接以仓库根目录为项目根目录（即**仓库和项目完全一致**），所需步骤：

1. github上面创建仓库
2. 本地项目根目录初始化仓库（git init）
3. 将本地所创建的项目的文件第一次提交 （git add . git commit）
3. 本地仓库与远程仓库的建立联系（git remote add xxx（remote name） xxx（remote））
4. 拉去远程仓库信息（git pull remotename master 有时需要 合并冲突）


合并文件内部冲突
-----
在pull时发生冲突的话，现更改冲突，然后重新add 再commit即可

让.gitignore对已经在仓库里的文件起作用
---
1. git rm -r --cached .
2. git add .
3. git commit -m ".gitignore is now working"


基本操作
---
- 比如，让Git显示颜色，会让命令输出看起来更醒目： git config --global color.ui true
- git status(时刻掌握仓库当前状态，告诉文件修改状态)
- git diff(查看文件修改内容)
- git log --pretty=oneline(使每次的commit的log在一行内显示)
- git log -2(显示最近两次commit)
- gitk(可视化git工具，用来看git log再好不过)
- HEAD表示当前版本，HEAD^上一个版本，HEAD~100第前一百个版本。


回退
---
- git reset --hard HEAD^(回退到上一个版本)或者--hard id(前七位数即可) 。
- cat查看文件内容。
- git reflog(查看每一次命令，包括reset这种回退命令)
- git checkout -- file(使工作区的file回到最后一次 commit 或 add 的状态 **一键还原，无论误操作是修改还是删除**)，git reset HEAD file(把file回退到最后一次commit的版本)

分支
---
**在git中应该大量使用分支操作**

- git checkout -b dev(= git branch dev + git checkout dev )
- 将dev分支工作成果合并在master分支上，切换到master分支再merge dev
- git branch -d删除分支
- 注意merge的时候有时会发生冲突，这时需要手动把冲突内容改过来，才能去merge
- 在实际开发中，我们应该按照几个基本原则进行分支管理：首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以。

- 合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。(修复bug时一定要用，使得在历史里面有为了修复bug而创建的分支)


修复bug
---
- 修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；
- 当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场。git stash list显示stash列表。

添加新功能
---
添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。

- git checkout -b feature-vulcan

多人协作
---
- 查看远程库信息，使用git remote -v；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
- 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。

标签管理
---
发布一个版本时，我们通常先在版本库中打一个标签，这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。

Git的标签虽然是版本库的快照，但其实它就是指向某个commit的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。

- 创建标签。在要打标签的分支上eg: git tag v1.0;比方说要对“add merge”这次提交打标签，它对应的commit id是6224937，敲入命令：git tag v0.9 6224937
- git tag查看标签
- git show <tagname>查看标签信息
- git tag -a <tagname> -m "blablabla..."可以指定标签信息；
- 如果标签打错了，也可以删除： git tag -d v0.1
- 如果要推送某个标签到远程，使用命令git push origin <tagname>。
- 或者，一次性推送全部尚未推送到远程的本地标签： git push origin --tags
- git push origin :refs/tags/<tagname>可以删除一个远程标签。

配置别名
----
- 设置log颜色。git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"