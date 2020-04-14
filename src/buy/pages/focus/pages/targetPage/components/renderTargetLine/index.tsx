import React from "react";
import { ISubTarget, ITarget } from "../../context";
import { Collapse } from "antd";
const { Panel } = Collapse;

interface IRenderTargetLine extends ITarget {}

export const RenderTargetLine: React.FC<IRenderTargetLine> = ({
  process,
  _id: targetId,
  level,
  createTime,
  finalComments,
  status,
  children
}) => {
  const { targetName, todos } = process[0];
  return (
    <Collapse key={targetId}>
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
                <td>
                  {status === "doing"
                    ? targetName
                    : finalComments
                    ? finalComments
                    : targetName}
                </td>
                <td>{createTime}</td>
                <td>{level}</td>
                <td>{todos && todos.length}</td>
                <td>{children}</td>
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
};

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
