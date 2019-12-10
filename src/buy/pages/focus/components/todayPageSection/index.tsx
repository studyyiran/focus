import React from "react";
import "./index.less";

/*
当日模块组件.
*/

export function TodayPageSection(props: {
  title: string; // 所属的模块类别
  children: any; // 具体的列表内容
}) {
  const { title, children } = props;
  return (
    <div>
      <h3>{title}</h3>
      <ul className="ul-line-container">{children}</ul>
    </div>
  );
}
