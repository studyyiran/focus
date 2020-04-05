import React, {
  useContext,
  useEffect,
} from "react";
import "./index.less";
import {
  TargetInfoContext,
} from "./context";
import { useShowNewTodoModal } from "../../components/newTodoModal";
import { Button, Input } from "antd";
import {RenderTargetLine} from "./components/renderTargetLine";

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
      <ul className="ul-line-container">
        {targetList.map(props => (
          <RenderTargetLine {...props} />
        ))}
      </ul>
      <Button
        onClick={useShowNewTodoModal({
          prevent: true,
          onSubmit: (values: any) => {
            const { content } = values;
            // 提交content
            addNewTarget({
              targetName: content
            });
          }
        })}
      >
        add 新的target
      </Button>
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
