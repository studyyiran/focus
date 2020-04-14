target part
我留下了手动部分。让用户在一周的任何时间，都可以进行，level up操作（当然，这是有最大等级的）。还有成神操作。这是合理的。
因为我需要给用户，绝对的自主性

为了减少自动计算level up的复杂度。我引入之前就想引入的sunny。
sunny每天10个点。来帮助用户保持持续

4-14
增加了复活机制。可以将target坟场的东西拉回来。
增加了tree的comments字段（对应的locktype状态）
将levelupbutton的枚举重新设计（对应的修改了接口结构）

一下是细节描述：
接下来我要开发
1）改善上下树的机制。

2）



梳理下整个流程

1、首先是todo

2、然后todo会关联到target上面

3、targetPage页面渲染button
button类别
1）level up
条件：至少完成了一个todo
根据条件，决定是否可以level up。并赋予下一个level comments（缺省的状态下，就默认为最后一个）

目前为手动levelup。不过也可以支持自动levelup。
只不过需要加一个levelup锁，来填写如正确的next level的名称。
目前简单处理。仅作手动。

2）tree类别
一进来
1）先执行level up的判断条件。
2）再执行auto tree的判断条件。
然后tree分为

上树
上树执行执行自动结算机制。

下数
下树是强行执行失败逻辑的树。

无论是哪种树，用户都需要填写，comments，作为这个target终结的一个描述。

因为树一定先执行levelup，这里存在这另外一种交互的可能：
用户点击level up 之后，才进行后续的tree相关的操作。这样ui和逻辑一致性更高。但是目前简单处理，因为没有这方面的需求。
这会很大程度增加复杂度。
level up
mission failed

next level
just tree

on tree
down tree
这会多很多很多的状态

4、tree
tree页面的东西分为
finish
fail
对于fail，可以通过支付，来重新开启。需要填写一个comments，这个复活的逻辑，是init + levelup



tree里面有waitList
之前上树，实际上上到了waitList里面。
只要被填上了comments，就可以从waitList里面，通过拖拽，放到我们最终的树上面。







关于自动
1）Todo的关联有期限，每周最后一天，就是本周的todo可以关联的最后期限。
2）每个月最后一个周的最后一天，会进行结算。对所有的人执行 上树操作，因此会先结算level up 再结算auto tree。
因为执行auto tree就必然会缺省一个comments。而且也因为，这是用户的预期之外的行为（就像是炉石帮我们自动结算每月奖励）因此这个结果需要出现在targetPage页面。以警世人。
所以，这里面有个状态，就叫做lockType。
用户需要填写lockType的comments之后，才能真正的让target得到安息。（这个机制也可以有别的作用，例如，自动结算level up的时候。总之，自动结算，就必须跟上报告呈现。）

3）这里面有另外一个考量。
如果我们每周结算一次（或者，让用户决定auto level up的时间间隔 还有auto tree的时间间隔）
这样的好处是，可以强行控制用户节奏。
但是隐患是
1）level的含义，会受到置疑。用户会关注，既然level每周结算一次，我也可以手动上level，那么level究竟意味着什么呢？
目前这个版本，level的含义，就是让用户改名用的+用户自己的roadmap。我不想去用任何的auto机制来加在level上面

2）如果level可以自动+手动添加。那么在上树的时候，上树奖励和level的关系，就变得很暧昧了。你没办法和用户说，
上树是一个大循环，levelup是一个小循环，至于他们的关系，我不确定。
目前就是在说，level，你们自己把控。上树，其实你们也可以自己把控。
我，只负责，去清理那些没人动的tree，还有没人关心的target todo关联问题。（也尽可能努力去让用户经常来。）