import React, { useContext, useEffect } from "react";
import "./index.less";
import { IGodTreeContext, GodTreeContext, ITreeNode } from "./context";

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
  console.log(treeList);
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
