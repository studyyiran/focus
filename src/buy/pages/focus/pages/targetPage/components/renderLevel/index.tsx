import React, { useContext } from "react";
import "./index.less";
import {ITarget, TargetInfoContext} from "../../context";
import {RenderLevelUpButtons} from "../renderLevelUpButtons";

interface IRenderTargetLevelUpButton extends ITarget {}

export const RenderTargetLevelUpButton: React.FC<IRenderTargetLevelUpButton> = props => {
  const targetInfoContext = useContext(TargetInfoContext);
  const {
    targetLevelUp
  } = targetInfoContext;

  if (props) {
    const { lockType, status, finalComments } = props;
    if (status === "doing") {
      if (lockType === "levelUpLockComments") {
        return (
          <RenderLevelUpButtons
            targetId={props._id}
            targetLevelUp={targetLevelUp}
            type="levelUpLockComments"
          />
        );
      } else {
        return (
          <RenderLevelUpButtons
            targetId={props._id}
            targetLevelUp={targetLevelUp}
          />
        );
      }
    } else {
      if (lockType || !finalComments) {
        return (
          <div>
            {status === "success" ? "success" : "fail"}
            <RenderLevelUpButtons
              targetId={props._id}
              targetLevelUp={targetLevelUp}
              type="setTreeComments"
            />
          </div>
        );
      } else {
        return null
      }
    }
  } else {
    return null;
  }
};
