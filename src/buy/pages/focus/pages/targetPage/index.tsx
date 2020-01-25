import React, { useCallback, useContext, useEffect } from "react";
import "./index.less";
import { ITargetInfoContext, TargetInfoContext } from "./context";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { Button } from "antd";

export function TargetInfoPage() {
  // 引入context
  const targetInfoContext = useContext(TargetInfoContext);
  const {
    targetInfoContextValue,
    addNewTarget,
    getTargetRelatedTodo
  } = targetInfoContext as ITargetInfoContext;
  // 从context中获取值
  const { targetWithCountList } = targetInfoContextValue;
  // local发起请求
  useEffect(() => {
    getTargetRelatedTodo();
  }, [getTargetRelatedTodo]);
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
    return targetWithCountList.map(({ _id, targetName, count }) => {
      return (
        <li className="line-container" key={_id}>
          <span>{targetName}</span>
          <span>{count}</span>
        </li>
      );
    });
  }
  return (
    <div className="test-page">
      <ul className="ul-line-container">{renderList()}</ul>
      <Button onClick={addModal}>add</Button>
    </div>
  );
}
