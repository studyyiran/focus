import React, { useContext, useEffect } from "react";
import "./index.less";
import { ITargetInfoContext, TargetInfoContext } from "./context";

export function TargetInfoPage() {
  // 引入context
  const targetInfoContext = useContext(TargetInfoContext);
  const {
    targetInfoContextValue,
    getTestAjaxValue
  } = targetInfoContext as ITargetInfoContext;
  // 从context中获取值
  const { targetWithCountList } = targetInfoContextValue;
  // local发起请求
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);
  // 渲染
  return <div className="test-page">
    {targetWithCountList.map(({id, targetName, count}) => {
      return <li key={id}>
        <span>{targetName}</span>
        <span>{count}</span>
      </li>
    })}
  </div>;
}
