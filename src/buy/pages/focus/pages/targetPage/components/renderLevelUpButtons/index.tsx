import React, { useEffect, useReducer, useState } from "react";
import {
  ISubTargetLevelUpJson,
  ITargetLevelUpJson
} from "../../context/useGetActions";
import { Button, Input } from "antd";
import { IReducerAction } from "../../../../../../common/mode/context/simple";
import MyModal from "../../../../../../components/modal";
import { FormWrapper } from "../../../../components/formWrapper";

interface IRenderLevelUpButtons {
  targetId: string;
  targetLevelUp: any;
  type?: string;
}

enum ButtonType {
  setTypeRelife = "setTypeRelife",
  failToTree = "failToTree",
  successToTree = "successToTree",
  levelup = "levelup"
}

export const RenderLevelUpButtons: React.FC<IRenderLevelUpButtons> = ({
  targetId,
  targetLevelUp,
  type
}) => {
  const initState: ITargetLevelUpJson = {
    targetArr: [] as ISubTargetLevelUpJson[]
  };
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [targetLevelUpJson, dispatchTargetLevelUpJson] = useReducer(
    reducer,
    initState
  );

  // 虽然说butotn click更加便捷。但我还是先用useEffect
  // 这个地方，其实并不合适。因为你把他放在一个组件里面了。而他的数据，确是一个跨越组件的数据。
  useEffect(() => {
    if (targetLevelUp) {
      targetLevelUp(targetLevelUpJson);
    }
  }, [targetLevelUp, targetLevelUpJson]);

  // 这个字段的作用暂时未知？
  const targetLevel =
    targetLevelUpJson &&
    targetLevelUpJson.targetArr &&
    targetLevelUpJson.targetArr.length &&
    targetLevelUpJson.targetArr.find(levelInfo => {
      return levelInfo.targetId === targetId;
    });

  function renderButtonByFormKey(key: ButtonType) {
    let dom = null;
    switch (key) {
      case ButtonType.levelup:
        dom = (
          <Button
            onClick={() => {
              // 开启Modal弹框，录入xxx
              levelupModal("comments", (info: any) => {
                dispatchTargetLevelUpJson({
                  type: ButtonType.levelup,
                  value: {
                    targetId,
                    innerValue: info.comments
                  }
                });
              });
            }}
          >
            LevelUp
          </Button>
        );
        break;
      case ButtonType.successToTree:
        // 如果已经完成任务
        dom = (
          <Button
            onClick={() => {
              // 开启Modal弹框，录入xxx
              levelupModal("comments", (info: any) => {
                dispatchTargetLevelUpJson({
                  type: ButtonType.successToTree,
                  value: {
                    targetId,
                    innerValue: info.comments
                  }
                });
              });
            }}
          >
            升阶
          </Button>
        );
        break;
      case ButtonType.failToTree:
        // 如果还没有完成 也没任何操作
        dom = (
          <Button
            onClick={() => {
              dispatchTargetLevelUpJson({
                type: ButtonType.failToTree,
                value: {
                  targetId,
                  innerValue: false
                }
              });
            }}
          >
            Fail
          </Button>
        );
        // if (targetLevel && targetLevel[key] === "" && !targetLevel.targetId) {
        // }
        break;

      case "setTypeRelife":
        // 如果还没有完成 也没任何操作
        dom = (
          <Button
            onClick={() => {
              dispatchTargetLevelUpJson({
                type: key,
                value: {
                  targetId,
                  innerValue: "relife"
                }
              });
            }}
          >
            Fail
          </Button>
        );
        // if (targetLevel && targetLevel[key] === "" && !targetLevel.targetId) {
        // }
        break;
    }
    return dom;
  }
  if (type) {
    switch (type) {
      case "relife":
        return (
          <ul>
            <li>{renderButtonByFormKey(ButtonType.setTypeRelife)}</li>
          </ul>
        );
        break;
    }
    return (
      <ul>
        <li>empty</li>
      </ul>
    );
  } else {
    return (
      <ul>
        <li>{renderButtonByFormKey(ButtonType.levelup)}</li>
        <li>{renderButtonByFormKey(ButtonType.successToTree)}</li>
        <li>{renderButtonByFormKey(ButtonType.failToTree)}</li>
      </ul>
    );
  }
};

function reducer(
  state: ITargetLevelUpJson,
  action: IReducerAction
): ITargetLevelUpJson {
  const { type, value } = action;
  if (value) {
    const { targetId, innerValue } = value;
    switch (type) {
      // 升级
      case "levelup": {
        return {
          targetArr: [
            ...state.targetArr,
            {
              targetId,
              type: "levelup",
              comments: innerValue
            }
          ]
        };
        break;
      }
      //  上树
      case "successToTree": {
        return {
          targetArr: [
            ...state.targetArr,
            {
              targetId,
              type: "tree",
              comments: innerValue
            }
          ]
        };
        break;
      }
      // 下数
      case "failToTree": {
        return {
          targetArr: [
            ...state.targetArr,
            {
              isPass: false,
              targetId,
              type: "tree",
              comments: innerValue
            }
          ]
        };
        break;
      }
      // 重生
      case "setTypeRelife": {
        return {
          targetArr: [
            ...state.targetArr,
            {
              targetId,
              type: "relife",
              comments: ""
            }
          ]
        };
        break;
      }
      default:
        break;
    }
  }
  return { ...state };
}

function levelupModal(type: string, callBack: any) {
  const modal = (MyModal as any).confirm({
    width: "70%",
    closable: true,
    maskClosable: false,
    title: null,
    footer: null,
    cancelText: "Got it",
    children: (
      <div className="post-item-form">
        <FormWrapper
          formConfig={[
            {
              id: type,
              initialValue: "",
              rules: [
                {
                  required: true,
                  message: "not empty"
                }
              ],
              renderFormEle: () => <Input />
            },
            {
              renderFormEle: () => <Button htmlType="submit">submit</Button>
            }
          ]}
          onSubmit={(...params: any[]) => {
            callBack(...params);
            modal.destroy();
          }}
        />
      </div>
    )
  });
}
