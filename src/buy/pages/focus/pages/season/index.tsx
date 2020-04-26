import React, { useContext, useEffect } from "react";
import "./index.less";
import { ISeasonContext, SeasonContext } from "./context";

export function SeasonPage() {
  // 引入context
  const seasonContext = useContext(SeasonContext);
  const {
    seasonContextValue,
    getTestAjaxValue
  } = seasonContext as ISeasonContext;
  // 从context中获取值
  const { testValue } = seasonContextValue;
  // local发起请求
  useEffect(() => {
    getTestAjaxValue();
  }, [getTestAjaxValue]);
  // 渲染
  console.log(testValue)
  return <div className="test-page">{123}</div>;
}
