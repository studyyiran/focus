import React, {
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import "./index.less";
import {
  ISubTarget,
  ITarget,
  ITargetInfoContext,
  TargetInfoContext
} from "./context";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { Button, Input } from "antd";
import { IReducerAction } from "../../../../common/mode/context/simple";
import MyModal from "../../../../components/modal";
import { FormWrapper } from "../../components/formWrapper";

function reducer(state: ITargetLevelUpJson, action: IReducerAction) {
  const { type, value } = action;
  switch (type) {
    case "nextTarget": {
      const { targetId, innerValue } = value;
      return {
        targetArr: [
          ...state.targetArr,
          {
            isPass: true,
            nextTree: "",
            targetId,
            nextTarget: innerValue
          }
        ]
      };
      break;
    }
    case "nextTree": {
      state.targetArr.forEach(item => {
        const { targetId, innerValue } = value;
        if (item.targetId === targetId) {
          item.nextTree = innerValue;
        }
      });
      return {
        targetArr: [...state.targetArr]
      };
      break;
    }
    case "isPass": {
      const { targetId, innerValue } = value;
      return {
        targetArr: [
          ...state.targetArr,
          {
            isPass: innerValue,
            nextTree: "",
            targetId,
            nextTarget: ""
          }
        ]
      };
      break;
    }
    default:
      return { ...state };
      break;
  }
}

interface ISub {
  isPass: boolean;
  targetId: string;
  nextTarget: string;
  nextTree: string;
}

export interface ITargetLevelUpJson {
  targetArr: ISub[];
}

export function TargetInfoPage() {
  const initState: ITargetLevelUpJson = { targetArr: [] as ISub[] };
  // 待迁移代码
  const [levelArr, dispatchLevelArr]: [any, any] = useReducer(
    reducer as any,
    initState as any
  );
  console.log(levelArr);
  // 引入context
  const targetInfoContext = useContext(TargetInfoContext);
  const [targetPageStatus, setTargetPageStatus] = useState("padding");
  const {
    targetInfoContextValue,
    addNewTarget,
    getTargetList,
    targetLevelUp
  } = targetInfoContext as ITargetInfoContext;
  // 从context中获取值
  const { targetList } = targetInfoContextValue;
  // local发起请求
  useEffect(() => {
    getTargetList();
  }, [getTargetList]);
  // 渲染

  const addModal = useShowNewTodoModal({
    prevent: true,
    onSubmit: (values: any) => {
      const { content } = values;
      // 提交content
      addNewTarget({
        targetName: content
      });
    }
  });

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

  function levelUpButtons(targetId: string) {
    const targetLevel = ((levelArr as any).targetArr as ISub[]).find(levelInfo => {
      return levelInfo.targetId === targetId;
    });

    function haha(key: keyof ISub) {
      let dom = null;
      switch (key) {
        case "nextTarget":
          dom = (
            <Button
              onClick={() => {
                // 开启Modal弹框，录入xxx
                levelupModal(key, (info: any) => {
                  dispatchLevelArr({
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
                  dispatchLevelArr({
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
                dispatchLevelArr({
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
      }
      return dom;
    }

    if (targetPageStatus === "doing") {
      // 已经有了
      if (targetLevel) {
        // 如果
        if (targetLevel.isPass === false) {
          return null;
        } else {
          if (!targetLevel.nextTree) {
            return (
              <ul>
                <li>{haha("nextTree")}</li>
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
        // 还没有
        return (
          <ul>
            <li>{haha("nextTarget")}</li>
            <li>{haha("isPass")}</li>
          </ul>
        );
      }
    } else {
      return null;
    }
  }

  function renderList() {
    return targetList.map(({ process, _id, level }) => {
      const { targetName, todos } = process[0];
      return (
        <>
          <li className="line-container" key={_id}>
            <span>{targetName}</span>
            <span>{level}</span>
            <span>{todos.length}</span>
            {levelUpButtons(_id)}
          </li>
          <RenderSubTargetList processArr={process} />
        </>
      );
    });
  }

  return (
    <div className="test-page">
      <div>status: {targetPageStatus}</div>
      <ul className="ul-line-container">{renderList()}</ul>
      <Button onClick={addModal}>add</Button>
      {targetPageStatus === "doing" ? (
        <Button onClick={() => {
          targetLevelUp(levelArr)
        }}>封神完成</Button>
      ) : (
        <Button
          onClick={() => {
            setTargetPageStatus("doing");
          }}
        >
          封神开始
        </Button>
      )}
    </div>
  );
}

interface IProps {
  processArr: ITarget["process"];
}

const RenderSubTargetList: React.FC<IProps> = props => {
  const { processArr } = props;
  return (
    <ul className="ul-line-container">
      {/*<li>*/}
      {/*  <span>targetName</span>*/}
      {/*  <span>status</span>*/}
      {/*  <span>createTime</span>*/}
      {/*  <span>levelUpTime</span>*/}
      {/*</li>*/}
      {processArr.map(subTarget => {
        const {
          _id,
          targetName,
          status,
          createTime,
          levelUpTime,
          todos
        } = subTarget;
        return (
          <>
            <li>
              <span>{targetName}</span>
              <span>{status}</span>
              <span>{createTime}</span>
              <span>{levelUpTime}</span>
            </li>
            <RenderTodoList todos={todos} />
          </>
        );
      })}
    </ul>
  );
};

interface IRenderTodoList {
  todos: ISubTarget["todos"];
}

const RenderTodoList: React.FC<IRenderTodoList> = props => {
  const { todos } = props;
  return (
    <ul className="ul-line-container">
      {todos.map((todo, index) => {
        const { _id, todoId, content, createTime, tag } = todo;
        return (
          <li key={_id}>
            <span>No：{index}</span>
            <span>{content}</span>
            <span>{tag}</span>
            <span>{createTime}</span>
          </li>
        );
      })}
    </ul>
  );
};
