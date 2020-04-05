import React, { useContext, useEffect } from "react";
import "./index.less";
import { IGodTreeContext, GodTreeContext } from "./context";

export function TreePage() {
  // 引入context
  const godTreeContext = useContext(GodTreeContext);
  const {
    godTreeContextValue,
    getTreeList
  } = godTreeContext as IGodTreeContext;
  // 从context中获取值
  const { treeList } = godTreeContextValue;
  // local发起请求
  useEffect(() => {
    getTreeList();
  }, [getTreeList]);
  // 渲染
  console.log(treeList)
  return <div className="test-page">{123}</div>;
}
