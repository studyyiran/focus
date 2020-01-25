import React, { useCallback, useContext, useEffect } from "react";
import "./index.less";
import { ITargetInfoContext, TargetInfoContext } from "./context";
import { useShowNewTodoModal } from "../../components/newTodoModal";

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
        <li key={_id}>
          <span>{targetName}</span>
          <span>{count}</span>
        </li>
      );
    });
  }
  return (
    <div className="test-page">
      {renderList()}
      <button onClick={addModal}>add</button>
    </div>
  );
}
