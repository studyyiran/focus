import React, {useContext, useEffect, useMemo, useReducer, useState} from "react";
import "./index.less";
import {
  ISubTarget,
  ITarget,
  ITargetInfoContext,
  TargetInfoContext,
  ITargetInfoState
} from "./context";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { Button, Input } from "antd";
import { IReducerAction } from "../../../../common/mode/context/simple";
import MyModal from "../../../../components/modal";
import { FormWrapper } from "../../components/formWrapper";
import { Collapse } from "antd";

const { Panel } = Collapse;

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
  // 引入context
  const targetInfoContext = useContext(TargetInfoContext);
  const {
    targetInfoContextValue,
    addNewTarget,
    getTargetList,
    targetLevelUp
  } = targetInfoContext;
  // 从context中获取值
  const { targetList } = targetInfoContextValue;

  // local发起请求
  useEffect(() => {
    getTargetList();
  }, [getTargetList]);

  return (
    <div className="target-page">
      {/*<div>成神页面status: {targetPageStatus}</div>*/}
      <ul className="ul-line-container">{useRenderList(targetList)}</ul>
      <Button onClick={useShowNewTodoModal({
        prevent: true,
        onSubmit: (values: any) => {
          const { content } = values;
          // 提交content
          addNewTarget({
            targetName: content
          });
        }
      })}>add 新的target</Button>
      {/*{renderLevelUpButton()}*/}
    </div>
  );


  // function renderHead(headerConfig) {
  //     // const {} = headerInfo
  //     return <Collapse>
  //       <Panel header="This is panel header 1" key="1">
  //         <p>{text}</p>
  //       </Panel>
  //     </Collapse>
  //   }
  // }
}


function useRenderList(targetList: ITargetInfoState['targetList']) {
  function useHehe({ process, _id: myTargetId, level, createTime }: any) {
    const { targetName, todos } = process[0];
    const dom = useRenderLevelUpButtons(myTargetId)
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
                <td>{dom}</td>
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
  }
  return targetList.map(useHehe);
}

function useRenderLevelUpButtons(targetId: string) {
  const initState: ITargetLevelUpJson = { targetArr: [] as ISub[]};
  // const [showMoreButton, setShowMoreButton] = useState(false);
  const [targetLevelUpJson, dispatchTargetLevelUpJson] = useReducer(
    reducer,
    initState
  );
  // const targetLevel = targetLevelUpJson && targetLevelUpJson.targetArr && targetLevelUpJson.targetArr.length && targetLevelUpJson.targetArr.find(
  //   levelInfo => {
  //     return levelInfo.targetId === targetId;
  //   }
  // );

  function renderButtonByFormKey(key: keyof ISub) {
    let dom = null;
    switch (key) {
      case "nextTarget":
        dom = (
          <Button
            onClick={() => {
              // 开启Modal弹框，录入xxx
              levelupModal(key, (info: any) => {
                // dispatchTargetLevelUpJson({
                //   type: key,
                //   value: {
                //     targetId,
                //     innerValue: info[key]
                //   }
                // });
              });
            }}
          >
            LevelUp
          </Button>
        );
        // if (!targetLevel || !targetLevel[key]) {
          // 如果没有 或者 没有这个字段
        // }
        break;
      case "nextTree":
        // 如果已经完成任务
        dom = (
          <Button
            onClick={() => {
              // 开启Modal弹框，录入xxx
              levelupModal(key, (info: any) => {
                // dispatchTargetLevelUpJson({
                //   type: key,
                //   value: {
                //     targetId,
                //     innerValue: info[key]
                //   }
                // });
              });
            }}
          >
            升阶
          </Button>
        );
        // if (targetLevel && targetLevel.nextTarget && !targetLevel[key]) {
        // }
        break;
      case "isPass":
        // 如果还没有完成 也没任何操作
        dom = (
          <Button
            onClick={() => {
              // dispatchTargetLevelUpJson({
              //   type: key,
              //   value: {
              //     targetId,
              //     innerValue: false
              //   }
              // });
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

  if (!false) {
    return (
      <ul>
        {/*<li>{renderButtonByFormKey("nextTree")}</li>*/}
      </ul>
    );
  } else {
    // 根据用户已经选的内容，进行按钮内容渲染
    // if (targetLevel) {
    //   if (targetLevel.isPass === false) {
    //     return null;
    //   } else {
    //     if (!targetLevel.nextTree) {
    //       return (
    //         <ul>
    //           {/*<li>{renderButtonByFormKey("nextTree")}</li>*/}
    //         </ul>
    //       );
    //     } else {
    //       return (
    //         <ul>
    //           <li>已成神</li>
    //         </ul>
    //       );
    //     }
    //   }
    // } else {
    //   return (
    //     <ul>
    //       {/*<li>{renderButtonByFormKey("nextTarget")}</li>*/}
    //       {/*<li>{renderButtonByFormKey("isPass")}</li>*/}
    //     </ul>
    //   );
    // }
  }
}

function reducer(state: ITargetLevelUpJson, action: IReducerAction) : ITargetLevelUpJson {
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


interface IRenderSubTargetList {
  processArr: ITarget["process"];
}

const RenderSubTargetList: React.FC<IRenderSubTargetList> = props => {
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
