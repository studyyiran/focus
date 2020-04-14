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

interface buttonType {
  isPass: boolean;
  targetId: string;
  nextTarget: string;
  nextTree: string;
  setTypeRelife: boolean;
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

  function renderButtonByFormKey(key: keyof buttonType) {
    let dom = null;
    switch (key) {
      case "nextTarget":
        dom = (
          <Button
            onClick={() => {
              // 开启Modal弹框，录入xxx
              levelupModal(key, (info: any) => {
                dispatchTargetLevelUpJson({
                  type: key,
                  value: {
                    targetId,
                    innerValue: info[key]
                  }
                });
              });
            }}
          >
            LevelUp
          </Button>
        );
        if (!targetLevel || !targetLevel[key]) {
          // 如果没有 或者 没有这个字段
        }
        break;
      case "nextTree":
        // 如果已经完成任务
        dom = (
          <Button
            onClick={() => {
              // 开启Modal弹框，录入xxx
              levelupModal(key, (info: any) => {
                dispatchTargetLevelUpJson({
                  type: key,
                  value: {
                    targetId,
                    innerValue: info[key]
                  }
                });
              });
            }}
          >
            升阶
          </Button>
        );
        if (targetLevel && targetLevel.nextTarget && !targetLevel[key]) {
        }
        break;
      case "isPass":
        // 如果还没有完成 也没任何操作
        dom = (
          <Button
            onClick={() => {
              dispatchTargetLevelUpJson({
                type: key,
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
            <li>{renderButtonByFormKey("setTypeRelife")}</li>
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
    if (!false) {
      return (
        <ul>
          <li>{renderButtonByFormKey("nextTarget")}</li>
          <li>{renderButtonByFormKey("nextTree")}</li>
          <li>{renderButtonByFormKey("isPass")}</li>
        </ul>
      );
    } else {
      // 根据用户已经选的内容，进行按钮内容渲染
      if (targetLevel) {
        if (targetLevel.isPass === false) {
          return null;
        } else {
          if (!targetLevel.nextTree) {
            return (
              <ul>
                <li>{renderButtonByFormKey("nextTree")}</li>
              </ul>
            );
          } else {
            return (
              <ul>
                <li>已成神</li>
              </ul>
            );
          }
        }
      } else {
        return (
          <ul>
            <li>{renderButtonByFormKey("nextTarget")}</li>
            <li>{renderButtonByFormKey("isPass")}</li>
          </ul>
        );
      }
    }
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
      case "nextTarget": {
        return {
          targetArr: [
            ...state.targetArr,
            {
              isPass: true,
              nextTree: "",
              type: "",
              targetId,
              nextTarget: innerValue
            }
          ]
        };
        break;
      }
      case "nextTree": {
        // state.targetArr.forEach(item => {
        //   const { targetId, innerValue } = value;
        //   if (item.targetId === targetId) {
        //     item.nextTree = innerValue;
        //   }
        // });
        // return {
        //   targetArr: [...state.targetArr]
        // };
        return {
          targetArr: [
            ...state.targetArr,
            {
              isPass: true,
              nextTree: innerValue,
              targetId,
              nextTarget: "",
              type: ""
            }
          ]
        };
        break;
      }
      case "isPass": {
        return {
          targetArr: [
            ...state.targetArr,
            {
              isPass: innerValue,
              nextTree: "",
              targetId,
              nextTarget: "",
              type: ""
            }
          ]
        };
        break;
      }
      case "setTypeRelife": {
        return {
          targetArr: [
            ...state.targetArr,
            {
              isPass: false,
              nextTree: "",
              targetId,
              nextTarget: "",
              type: "relife"
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
