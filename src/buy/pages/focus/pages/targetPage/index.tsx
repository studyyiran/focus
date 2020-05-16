import React, { useContext, useEffect } from "react";
import "./index.less";
import {
  getCurrentTargetName,
  ISubTarget,
  ITarget,
  ITargetTodoInfo,
  TargetInfoContext
} from "./context";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { Button, Input } from "antd";
import moment from "moment-timezone";
import { RenderLevelUpButtons } from "./components/renderLevelUpButtons";
import { sunnyType } from "../../config/tagArrConfig";
import { TodayPageSection } from "../today/components/todayPageSection";
import { IMyFocusContext, MyFocusContext } from "../../context";
import { TodoLine } from "../../components/ToDoLine";
import {PostForm} from "../today/components/postForm";

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
  const myFocusContext = useContext(MyFocusContext);
  const { changeStudyItemStatus } = myFocusContext as IMyFocusContext;
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
  let theOthersProcess: ISubTarget[] = [];
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
      theOthersProcess = process.slice(1);
    }
    console.log(theOthersProcess);
    currentPlane = currentPlane.sort((a, b) => {
      // 先建立的todo 先显示
      return moment(a.todoCreateTime).isBefore(b.todoCreateTime) ? -1 : 1;
    });

    currentTodoFinish = currentTodoFinish.sort((a, b) => {
      // 先完成的项目 后显示
      return moment(a.todoFinishDate).isBefore(b.todoFinishDate) ? 1 : -1;
    });
  }

  // TODO 下面这两个 ts都不对
  return (
    <div className="target-page">
      {currentTargetInfo && currentTargetInfo._id ? <h1>{getCurrentTargetName(currentTargetInfo)}</h1> : null}
      {/*<div>成神页面status: {targetPageStatus}</div>*/}
      {/*<div>今日剩余: {dailySunny}</div>*/}
      {/*<ul className="ul-line-container">*/}
      {/*  {targetList.map(props => (*/}
      {/*    <RenderTargetLine {...props}>{renderButton(props)}</RenderTargetLine>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      <PostForm defaultTargetId={currentTargetInfo && currentTargetInfo._id} />
      <TodayPageSection title={"plan"}>
        {currentPlane && currentPlane.length
          ? currentPlane.map(item => {
              const { _id, todoId } = item;
              return (
                <li key={_id}>
                  <TodoLine
                    key={todoId}
                    {...item as any}
                    onClickButton1={() => {
                      changeStudyItemStatus(todoId);
                    }}
                  />
                </li>
              );
            })
          : null}
      </TodayPageSection>
      <TodayPageSection title={"已完成"} arr={currentTodoFinish} haveDone={true} />
      {theOthersProcess.map(({ targetName, todos }) => {
        return <TodayPageSection title={targetName} arr={todos} haveDone={true} />;
      })}

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
