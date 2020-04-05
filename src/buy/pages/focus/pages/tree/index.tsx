import React, { useContext, useEffect } from "react";
import "./index.less";
import { IGodTreeContext, GodTreeContext } from "./context";

export function TreePage() {
  // 引入context
  const godTreeContext = useContext(GodTreeContext);
  const {
    godTreeContextValue,
    getTestAjaxValue
  } = godTreeContext as IGodTreeContext;
  // 从context中获取值
  const { testValue } = godTreeContextValue;
  // local发起请求
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);
  // 渲染
  return <div className="test-page">{testValue}</div>;
}
