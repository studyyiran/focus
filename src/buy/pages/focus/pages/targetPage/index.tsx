import React, { useContext, useEffect } from "react";
import "./index.less";
import { ITarget, ITargetTodoInfo, TargetInfoContext } from "./context";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { Button, Input } from "antd";
import moment from "moment-timezone";
import { RenderLevelUpButtons } from "./components/renderLevelUpButtons";
import { sunnyType } from "../../config/tagArrConfig";
import { TodayPageSection } from "../today/components/todayPageSection";

export function TargetInfoPage() {
  // 引入context
  const targetInfoContext = useContext(TargetInfoContext);
  const {
    targetInfoContextValue,
    addNewTarget,
    getTargetList,
    targetLevelUp
  } = targetInfoContext;
  // 从context中获取值
  let { targetList, currentTargetInfo } = targetInfoContextValue;

  // local发起请求
  useEffect(() => {
    getTargetList();
  }, [getTargetList]);

  function renderButton(props: ITarget) {
    if (props) {
      const { lockType, status, finalComments } = props;
      if (status === "doing") {
        if (lockType === "levelUpLockComments") {
          return (
            <RenderLevelUpButtons
              targetId={props._id}
              targetLevelUp={targetLevelUp}
              type="levelUpLockComments"
            />
          );
        } else {
          return (
            <RenderLevelUpButtons
              targetId={props._id}
              targetLevelUp={targetLevelUp}
            />
          );
        }
      } else {
        if (lockType || !finalComments) {
          return (
            <div>
              {status === "success" ? "success" : "fail"}
              <RenderLevelUpButtons
                targetId={props._id}
                targetLevelUp={targetLevelUp}
                type="setTreeComments"
              />
            </div>
          );
        }
      }
    } else {
      return null;
    }
  }

  /*
  1) 最后一个todo的时间。

  方案2）
  按照total count排序
  然后是level排序。
  */

  let currentPlane: ITargetTodoInfo[] = [];
  let currentTodoFinish: ITargetTodoInfo[] = [];
  let theOthersProcess = [];
  if (currentTargetInfo) {
    const { process } = currentTargetInfo;
    if (process && process.length) {
      if (process && process[0]) {
        process[0].todos.forEach(todo => {
          if (todo.todoFinishDate) {
            // 完成的
            currentTodoFinish.push(todo);
          } else {
            // 未完成的
            currentPlane.push(todo);
          }
        });
      }
      theOthersProcess = process.slice(1).map(({ todos }) => {
        return todos;
      });
    }
  }

  currentPlane = currentPlane.sort((a, b) => {
    // 先建立的todo 先显示
    return moment(a.todoCreateTime).isBefore(b.todoCreateTime) ? -1 : 1;
  });

  currentTodoFinish = currentTodoFinish.sort((a, b) => {
    // 先完成的项目 后显示
    return moment(a.todoFinishDate).isBefore(b.todoFinishDate) ? 1 : -1;
  });

  return (
    <div className="target-page">
      {/*<div>成神页面status: {targetPageStatus}</div>*/}
      {/*<div>今日剩余: {dailySunny}</div>*/}
      {/*<ul className="ul-line-container">*/}
      {/*  {targetList.map(props => (*/}
      {/*    <RenderTargetLine {...props}>{renderButton(props)}</RenderTargetLine>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      <TodayPageSection title={"plan"} arr={currentPlane} />
      <TodayPageSection title={"已完成"} arr={currentTodoFinish} />
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
        add 新的target({sunnyType.newTarget})
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
