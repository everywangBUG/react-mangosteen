# 把之前的dist删除
rm -rf dist
# 在github上面的仓库预览 base必须要写，否则404, base前面还需要加--空格，原因不详
npm run build -- --base /mangosteen-preview
# 进入到dist目录
cd dist
git init
git add .
git commit -m '部署'
# git 默认把分支名字叫做main，强制把分支名字叫做master
git branch -M master
# 添加远程仓库，最好是ssh地址
git remote add origin git@github.com:everywangBUG/mangosteen-preview.git
# 代码强制上传，防止第二次和第一次的代码有冲突，不能上传成功, master:master， 把本地的master上传到远程的master
git push -f origin master:master
# 输出部署成功
echo '========================部署成功============================'
# 回到上一层
# cd ..
# 回到之前的目录
cd -
# 删除dist目录，如果需要的话
# rm -rf dist

# github部署成功后的一般生成的网页地址
# https://everywangBUG.github.io/mangosteen-preview