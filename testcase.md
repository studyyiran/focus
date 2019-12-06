这次迭代我发现我需要测试用例。
接口用例
getToday
返回未完成的,未删除的.并且
今天的内容.
昨天的内容.(不包括过期的内容)
还有


接口
newStudyTodoItem
changeStudyItemStatus
getTodayList
ChangeTodoItem

功能描述
newStudyTodoItem之后,都会自动刷新所有的列表,进行数据同步.
ChangeTodoItem 目前只在弹框的修改功能上使用.他可以用于修改 content tag timeType三个属性值
add tomorrow 是getToday之后,计算出来的.

today页面
元素：add button
接口：newStudyTodoItem
选项：tag content
结果：成功。列表自动新增一条。

元素：finish
接口： changeStudyItemStatus
选项：
结果：成功。列表自动减少一条。done页面增加一条

元素：列表分类
接口： getTodayList
选项：
结果：成功。并且分类正常。

done页面
元素：quick finish
接口：newStudyTodoItem
选项：tag等
结果：并且最上面自动新增一条完成记录。之后自动刷新页面


元素：add Into Tomorrow
接口：newStudyTodoItem
选项：tag等
结果：在history增加一条记录。不需要任何输入。类别必定为review.明天的计划也应该+1


元素：页面
接口：newStudyTodoItem
选项：初始化的时候
结果：会自动获得 明天已经拍好的计划 还有今天的计划.

元素：add Tomorrow TODo 规划明天的计划
接口：newStudyTodoItem
选项：tag等
结果：明天计划+1

history页面 元素：action
接口：
选项：
结果：

元素：action.add as today
接口：newStudyTodoItem
选项：
结果：在今日马上新增一条.并且会自动刷新


元素：action.delete
接口：newStudyTodoItem
选项：
结果：清空一条数据

元素：action.ChangeTodoItem
接口：ChangeTodoItem
选项：
结果：立马修改一条数据状态.他返回了整个history数据.


wishList页面后
元素：add wish
接口：newStudyTodoItem
选项：
结果：新增一条wish数据.并刷新wish页面


元素：quick add today
接口：changeItemContent
选项：
结果：从列表一出道当日.刷新列表

元素：slow add today
接口：changeItemContent
选项：
结果：从列表一出道done中的计划.刷新列表


