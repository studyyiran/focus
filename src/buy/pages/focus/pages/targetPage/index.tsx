import React, { useCallback, useContext, useEffect } from "react";
import "./index.less";
import {
  ISubTarget,
  ITarget,
  ITargetInfoContext,
  TargetInfoContext
} from "./context";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { Button } from "antd";

export function TargetInfoPage() {
  // 引入context
  const targetInfoContext = useContext(TargetInfoContext);
  const {
    targetInfoContextValue,
    addNewTarget,
    getTargetList
  } = targetInfoContext as ITargetInfoContext;
  // 从context中获取值
  const { targetList } = targetInfoContextValue;
  // local发起请求
  useEffect(() => {
    getTargetList();
  }, [getTargetList]);
  // 渲染

  const addModal = useShowNewTodoModal({
    prevent: true,
    onSubmit: (values: any) => {
      const { content } = values;
      // 提交content
      addNewTarget({
        targetName: content
      });
    }
  });

  function renderList() {
    return targetList.map(({ process, _id, level }) => {
      const { targetName, todos } = process[0];
      return (
        <>
          <li className="line-container" key={_id}>
            <span>{targetName}</span>
            <span>{level}</span>
            <span>{todos.length}</span>
          </li>
          <RenderSubTargetList processArr={process} />
        </>
      );
    });
  }
  return (
    <div className="test-page">
      <ul className="ul-line-container">{renderList()}</ul>
      <Button onClick={addModal}>add</Button>
      <Button>封神开始</Button>
    </div>
  );
}

interface IProps {
  processArr: ITarget["process"];
}

const RenderSubTargetList: React.FC<IProps> = props => {
  const { processArr } = props;
  return (
    <ul className="ul-line-container">
      {/*<li>*/}
      {/*  <span>targetName</span>*/}
      {/*  <span>status</span>*/}
      {/*  <span>createTime</span>*/}
      {/*  <span>levelUpTime</span>*/}
      {/*</li>*/}
      {processArr.map(subTarget => {
        const {
          _id,
          targetName,
          status,
          createTime,
          levelUpTime,
          todos
        } = subTarget;
        return (
          <>
            <li>
              <span>{targetName}</span>
              <span>{status}</span>
              <span>{createTime}</span>
              <span>{levelUpTime}</span>
            </li>
            <RenderTodoList todos={todos} />
          </>
        );
      })}
    </ul>
  );
};

interface IRenderTodoList {
  todos: ISubTarget["todos"];
}

const RenderTodoList: React.FC<IRenderTodoList> = props => {
  const { todos } = props;
  return (
    <ul className="ul-line-container">
      {todos.map((todo, index) => {
        const { _id, todoId, content, createTime, tag } = todo;
        return (
          <li key={_id}>
            <span>No：{index}</span>
            <span>{content}</span>
            <span>{createTime}</span>
            <span>{tag}</span>
          </li>
        );
      })}
    </ul>
  );
};
