import React, { useContext, useEffect } from "react";
import "./index.less";
import { ITarget, TargetInfoContext } from "./context";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { Button, Input } from "antd";
import { RenderTargetLine } from "./components/renderTargetLine";
import moment from "moment-timezone";
import { MyFocusContext } from "../../context";

export function TargetInfoPage() {
  // 引入context
  const targetInfoContext = useContext(TargetInfoContext);
  const myFocusContext = useContext(MyFocusContext);
  const { myFocusContextValue, getDailySunny } = myFocusContext;

  useEffect(() => {
    getDailySunny();
  }, [getDailySunny]);

  const {dailySunny} = myFocusContextValue

  const {
    targetInfoContextValue,
    addNewTarget,
    getTargetList,
    targetLevelUp
  } = targetInfoContext;
  // 从context中获取值
  let { targetList } = targetInfoContextValue;
  targetList = targetList.sort((a, b) => {
    if (moment(getPosition(a)).isBefore(moment(getPosition(b)))) {
      return 1;
    } else {
      return -1;
    }
    debugger;
    return 0;
  });
  function getPosition(target: ITarget) {
    if (target && target.process && target.process[0]) {
      const current = target.process[0];
      if (current && current.todos && current.todos[0]) {
        return current.todos[0].createTime;
      }
      return target.process[0].createTime;
    } else {
      return target.createTime;
    }
  }
  // local发起请求
  useEffect(() => {
    getTargetList();
  }, [getTargetList]);

  /*
  1) 最后一个todo的时间。

  方案2）
  按照total count排序
  然后是level排序。
  */
  return (
    <div className="target-page">
      {/*<div>成神页面status: {targetPageStatus}</div>*/}
      <div>今日剩余: {dailySunny}</div>
      <ul className="ul-line-container">
        {targetList.map(props => (
          <RenderTargetLine {...props} targetLevelUp={targetLevelUp} />
        ))}
      </ul>
      <Button
        onClick={useShowNewTodoModal({
          prevent: true,
          onSubmit: (values: any) => {
            const { content } = values;
            // 提交content
            addNewTarget({
              targetName: content
            });
          }
        })}
      >
        add 新的target
      </Button>
      {/*{renderLevelUpButton()}*/}
    </div>
  );

  // function renderHead(headerConfig) {
  //     // const {} = headerInfo
  //     return <Collapse>
  //       <Panel header="This is panel header 1" key="1">
  //         <p>{text}</p>
  //       </Panel>
  //     </Collapse>
  //   }
  // }
}
