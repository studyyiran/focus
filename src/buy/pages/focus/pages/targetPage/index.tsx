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
    return targetList.map(({ process, _id }) => {
      const {targetName, todos} = process[0]
      return (
        <li className="line-container" key={_id}>
          <span>{targetName}</span>
          <span>{todos.length}</span>
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
