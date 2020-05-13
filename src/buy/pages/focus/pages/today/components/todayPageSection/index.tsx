import React from "react";
import "./index.less";
import { Collapse } from "antd";
const { Panel } = Collapse;

/*
当日模块组件.
*/

export function TodayPageSection(props: {
  title: string; // 所属的模块类别
  children: any; // 具体的列表内容
  haveDone?: boolean;
}) {
  const { title, children, haveDone } = props;
  if (children) {
      return (
          <Collapse key={title} defaultActiveKey={title}>
              <Panel key={title} header={<h3>{title}</h3>}>
                  <ul className={`ul-line-container-d`}>{children}</ul>
              </Panel>
          </Collapse>
      );
  } else {
      return null
  }

}
