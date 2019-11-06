git checkout dev # 更新
git pull
git checkout master
git pull
git flow hotfix start v0.6.6
git cherry-pick feature
git flow hotfix finish v0.6.6
git checkout dev  # 先搞dev
git push
git checkout master  # 再搞master
git push
git push --tags
git branch -D feature   # 再重置feature
git checkout -b feature