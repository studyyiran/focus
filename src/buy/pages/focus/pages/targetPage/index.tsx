import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { Collapse } from "antd";

const { Panel } = Collapse;

function reducer(state: ITargetLevelUpJson, action: IReducerAction) {
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
              nextTarget: ""
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
              nextTarget: ""
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
  const [targetLevelUpJson, dispatchTargetLevelUpJson]: [any, any] = useReducer(
    reducer as any,
    initState as any
  );
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

  useEffect(() => {
    if (targetLevelUpJson && targetLevelUpJson.targetArr && targetLevelUpJson.targetArr.length) {
      targetLevelUp(targetLevelUpJson);
    }
  }, [targetLevelUpJson]);

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

  function renderLevelUpButtons(targetId: string) {
    const targetLevel = ((targetLevelUpJson as any).targetArr as ISub[]).find(
      levelInfo => {
        return levelInfo.targetId === targetId;
      }
    );

    function haha(key: keyof ISub) {
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
      return (
        <ul>
          <li>{haha("nextTree")}</li>
        </ul>
      );
    }
  }

  // function renderHead(headerConfig) {
  //     // const {} = headerInfo
  //     return <Collapse>
  //       <Panel header="This is panel header 1" key="1">
  //         <p>{text}</p>
  //       </Panel>
  //     </Collapse>
  //   }
  // }

  function renderList() {
    return targetList.map(({ process, _id: myTargetId, level, createTime }) => {
      const { targetName, todos } = process[0];
      return (
        <Collapse key={myTargetId}>
          <Panel
            header={
              <table>
                <thead>
                  <tr>
                    <th>当前的Target</th>
                    <th>createTime</th>
                    <th>有效success level</th>
                    <th>当前的Target todo count</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{targetName}</td>
                    <td>{createTime}</td>
                    <td>{level}</td>
                    <td>{todos && todos.length}</td>
                    <td>{renderLevelUpButtons(myTargetId)}</td>
                  </tr>
                </tbody>
              </table>
            }
            key="1"
          >
            <RenderSubTargetList processArr={process} />
          </Panel>
        </Collapse>
      );
    });
  }

  return (
    <div className="target-page">
      <div>成神页面status: {targetPageStatus}</div>
      <ul className="ul-line-container">{renderList()}</ul>
      <Button onClick={addModal}>add 新的target</Button>
      {targetPageStatus === "doing" ? (
        <Button
          onClick={() => {
            targetLevelUp(targetLevelUpJson);
          }}
        >
          封神完成
        </Button>
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
  const dom = processArr.map(subTarget => {
    const {
      _id,
      targetName,
      status,
      createTime,
      levelUpTime,
      todos
    } = subTarget;
    return (
      <Collapse key={_id}>
        <Panel
          key={_id}
          header={
            <table>
              <thead>
                <tr>
                  <th>targetName</th>
                  <th>createTime</th>
                  <th>levelUpTime</th>
                  <th>status</th>
                  <th>todo count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{targetName}</td>
                  <td>{createTime}</td>
                  <td>{levelUpTime}</td>
                  <td>{status}</td>
                  <td>{todos && todos.length}</td>
                </tr>
              </tbody>
            </table>
          }
        >
          <RenderTodoList todos={todos} />
        </Panel>
      </Collapse>
    );
  });
  return <div>{dom}</div>;
  // return (
  //   <ul className="ul-line-container">
  //     {}
  //   </ul>
  // );
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
