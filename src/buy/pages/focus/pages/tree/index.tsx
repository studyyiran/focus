import React, { useContext, useEffect } from "react";
import "./index.less";
import { IGodTreeContext, GodTreeContext, ITreeNode } from "./context";
import { TargetInfoContext } from "../targetPage/context";
import {RenderTargetLine} from "../targetPage/components/renderTargetLine";

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

  const targetInfoContext = useContext(TargetInfoContext);
  const { getTargetListHaveFinish, targetInfoContextValue } = targetInfoContext;

  const { targetListHaveFinish } = targetInfoContextValue;
  useEffect(() => {
    getTargetListHaveFinish();
  }, [getTargetListHaveFinish]);

  // 渲染
  console.log(treeList);
  console.log(targetListHaveFinish);
  return (
    <div className="tree-page">
      <table>
        <thead>
          <tr>
            <th>createTime</th>
            <th>targetId</th>
            <th>comments</th>
          </tr>
        </thead>
        <tbody>
          {treeList.map(props => (
            <RenderTreeLine {...props} />
          ))}
        </tbody>
      </table>
      <section>{targetListHaveFinish.map(props => (
        <RenderTargetLine {...props} />
      ))}</section>
    </div>
  );
}

interface Iehe extends ITreeNode {}

const RenderTreeLine: React.FC<Iehe> = props => {
  const { createTime, targetId, comments } = props;
  return (
    <tr>
      <td>{createTime}</td>
      <td>{targetId}</td>
      <td>{comments}</td>
    </tr>
  );
};
