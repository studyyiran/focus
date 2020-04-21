import React, { useContext, useEffect } from "react";
import "./index.less";
import { IGodTreeContext, GodTreeContext, ITreeNode } from "./context";
import { TargetInfoContext } from "../targetPage/context";
import { RenderTargetLine } from "../targetPage/components/renderTargetLine";
import { RenderLevelUpButtons } from "../targetPage/components/renderLevelUpButtons";
import { ShowTree } from "./components/tree";

export function TreePage() {
  // 引入context
  const godTreeContext = useContext(GodTreeContext);
  const {
    godTreeContextValue,
    getTreeList,
    getTreeShape,
      changeTreeShape,
    changeTargetNodePoint
  } = godTreeContext as IGodTreeContext;
  // 从context中获取值
  const { treeList, treeShape } = godTreeContextValue;
  // local发起请求
  useEffect(() => {
    getTreeList();
    getTreeShape();
  }, [getTreeList, getTreeShape]);

  const targetInfoContext = useContext(TargetInfoContext);
  const {
    getTargetListHaveFinish,
    targetInfoContextValue,
    targetLevelUp
  } = targetInfoContext;

  const { targetListHaveFinish } = targetInfoContextValue;
  useEffect(() => {
    getTargetListHaveFinish();
  }, [getTargetListHaveFinish]);

  const treeData = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          disabled: true,
          children: [
            {
              title: "leaf",
              key: "0-0-0-0",
              disableCheckbox: true
            },
            {
              title: "leaf",
              key: "0-0-0-1"
            }
          ]
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
          children: [
            {
              title: <span style={{ color: "#1890ff" }}>sss</span>,
              key: "0-0-1-0"
            }
          ]
        }
      ]
    }
  ];

  const emptyTreeShape = {
    title: 'root',
    children: [

    ]
  }

  function treeList2DifferentTree(treeList: ITreeNode[]) {
    let result = [
        [] as ITreeNode[],[] as ITreeNode[]
    ]
    treeList.forEach((treeNode) => {
      if (treeNode && treeNode.targetNodeId) {
        result[1].push(treeNode)
      } else {
        result[0].push(treeNode)
      }
    })
    return result
  }

  const [downTree, upTree] = treeList2DifferentTree(treeList)
  console.log(downTree)
  console.log(upTree)
  // 渲染
  return (
    <div className="tree-page">
      <section>
        <h2>show tree</h2>
        <ShowTree treeData={downTree.map((treeNode, index) => {
          console.log(treeNode._id)
          return {
            title: treeNode.createTime,
            key: treeNode.id,
            children: []
          }
        })} />
        <div onClick={() => {
          changeTreeShape({nextTreeShape: emptyTreeShape})
        }}>add tree shape</div>
      </section>
      <section>
        <h2>finish</h2>
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
      </section>
      <section>
        <h2>finish detail</h2>
        {targetListHaveFinish
          .filter(i => i.status === "success")
          .map(props => (
            <RenderTargetLine {...props}></RenderTargetLine>
          ))}
      </section>
      <section>
        <h2>fail detail</h2>
        {targetListHaveFinish
          .filter(i => i.status === "fail")
          .map(props => (
            <RenderTargetLine {...props}>
              <RenderLevelUpButtons
                targetId={props._id}
                targetLevelUp={targetLevelUp}
                type={"relife"}
              />
            </RenderTargetLine>
          ))}
      </section>
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
