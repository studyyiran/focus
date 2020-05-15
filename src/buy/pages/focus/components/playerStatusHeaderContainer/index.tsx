import React, { useContext, useEffect } from "react";
import "./index.less";
import {PlayerGrowthInfo} from "../playerGrowthInfo";
import {GodTreeContext, IGodTreeContext} from "../../pages/tree/context";

interface IPlayerGrowthInfoContainer {

}

export const PlayerGrowthInfoContainer: React.FC<IPlayerGrowthInfoContainer> = props => {
  const godTreeContext = useContext(GodTreeContext);
  const {
    godTreeContextValue,
  } = godTreeContext as IGodTreeContext;
  // 从context中获取值
  const { treeShape } = godTreeContextValue;

  // 渲染
  return <PlayerGrowthInfo score={treeShape && treeShape[0] && treeShape[0].score} />
}
