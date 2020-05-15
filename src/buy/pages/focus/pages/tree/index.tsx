import React, {useContext, useEffect, useState} from "react";
import "./index.less";
import {IGodTreeContext, GodTreeContext, ITreeNode, godTreeReducerTypes} from "./context";
import { TargetInfoContext } from "../targetPage/context";
import { RenderTargetLine } from "../targetPage/components/renderTargetLine";
import { RenderLevelUpButtons } from "../targetPage/components/renderLevelUpButtons";
import { ShowTree } from "./components/tree";
import { PlayerGrowthInfo } from "../../components/playerGrowthInfo";

export function TreePage() {
  // 引入context
  const godTreeContext = useContext(GodTreeContext);
  const {
    godTreeContextValue,
    getTreeList,
    getTreeShape,
  } = godTreeContext as IGodTreeContext;
  // 从context中获取值
  // const { treeShape } = godTreeContextValue;
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

  // 渲染
  return (
    <div className="tree-page">
      <section>
        <h2>show tree</h2>
        <ShowTree targetListHaveFinish={targetListHaveFinish} />
      </section>
        {/*暂时没有必要列出来waitList*/}
      {/*<section>*/}
      {/*  <h2>finish</h2>*/}
      {/*  <table>*/}
      {/*    <thead>*/}
      {/*      <tr>*/}
      {/*        <th>createTime</th>*/}
      {/*        <th>targetId</th>*/}
      {/*        <th>comments</th>*/}
      {/*      </tr>*/}
      {/*    </thead>*/}
      {/*    <tbody>*/}
      {/*      {treeList.map(props => (*/}
      {/*        <RenderTreeLine {...props} />*/}
      {/*      ))}*/}
      {/*    </tbody>*/}
      {/*  </table>*/}
      {/*</section>*/}
      {/*<section>*/}
      {/*  <h2>finish detail</h2>*/}
      {/*  {targetListHaveFinish*/}
      {/*    .filter(i => i.status === "success")*/}
      {/*    .map(props => (*/}
      {/*      <RenderTargetLine {...props}><RenderLevelUpButtons*/}
      {/*          targetId={props._id}*/}
      {/*          targetLevelUp={targetLevelUp}*/}
      {/*          type={"relife"}*/}
      {/*      /></RenderTargetLine>*/}
      {/*    ))}*/}
      {/*</section>*/}
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


