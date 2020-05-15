import React from "react";
import "./index.less";
import { Collapse } from "antd";
import { IListItem } from "../../../../context/interface";
import { TodoLine } from "../../../../components/ToDoLine";
const { Panel } = Collapse;

/*
当日模块组件.
*/

export function TodayPageSection(props: {
  title: string; // 所属的模块类别
  children?: any; // 具体的列表内容
  arr?: any[];
  onClickButton1?: any;
  haveDone?: boolean;
}) {
  const { title, arr, haveDone, onClickButton1, children } = props;

  function renderList(list: IListItem[]) {
    if (list && list.length) {
      return list.map(item => {
        const { content, tag, _id } = item;
        return (
          <li key={_id}>
            <TodoLine {...item} onClickButton1={onClickButton1} haveDone={haveDone} />
          </li>
        );
      });
    }
  }

  if (children) {
    return (
      <Collapse key={title} defaultActiveKey={title}>
        <Panel key={title} header={<h3>{title}</h3>}>
          <ul className={`ul-line-container-d`}>{children}</ul>
        </Panel>
      </Collapse>
    );
  } else if (arr && arr.length) {
    return (
      <Collapse key={title} defaultActiveKey={title}>
        <Panel key={title} header={<h3>{title}</h3>}>
          <ul className={`ul-line-container-d`}>{renderList(arr)}</ul>
        </Panel>
      </Collapse>
    );
  } else {
    return null;
  }
}
