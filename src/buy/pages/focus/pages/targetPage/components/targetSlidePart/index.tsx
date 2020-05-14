import React, {useContext} from "react";
import './index.less';
import {TargetInfoContext} from "../../context";

interface ITargetSlidePart {

}

export const TargetSlidePart: React.FC<ITargetSlidePart> = props => {
  const targetInfoContext = useContext(TargetInfoContext);
  const {
    targetInfoContextValue,
    addNewTarget,
    getTargetList,
    targetLevelUp
  } = targetInfoContext;
  // 从context中获取值
  let { targetList } = targetInfoContextValue;

  return <div className="component-style">
    <header>
      <h2>梦想清单</h2>
    </header>
  </div>
}