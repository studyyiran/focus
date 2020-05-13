import React, { useContext, useEffect } from "react";
import "./index.less";
import { tagArr } from "../../config/tagArrConfig";
import { IListItem } from "../../context/interface";
import moment from "moment";

interface ITodoLine extends IListItem {
  onClickButton1?: any;
  haveDone?: boolean;
}

export function TodoLine(props: ITodoLine) {
  const {
    tag,
    content,
    onClickButton1,
    _id,
    planStartTime,
    haveDone
  } = props;
  const findTarget = (tagArr as any).find((tagItem: any) => {
    return tagItem.value === tag;
  });
  // 这部的目的是？
  const tagName = findTarget ? findTarget.name : tag;

  function returnFormatTime(time: string) {
    return moment(time).calendar(moment(), {
      sameDay: "[今天]",
      nextDay: "[明天]",
      nextWeek: "dddd",
      lastDay: "[昨天]",
      lastWeek: "[上个] dddd",
      sameElse: "DD/MM/YYYY"
    });
  }
  function moreContent(content: string) {
    let string = "";
    for (let i = 0; i < 1; i++) {
      string += content;
    }
    return string;
  }
  return (
    <div className={`l-task-bg todo-line ${haveDone ? 'task-checked' : ''}`}>
      <div className="left">
        <input
          checked={haveDone ? true : false}
          className="checkbox-button"
          type="checkbox"
          onChange={() => {
            onClickButton1 && onClickButton1(_id);
          }}
        />
        <p>{moreContent(content)}</p>
      </div>
      <div className="right">
        <div className="tag-container">{tagName}</div>
        <div className="date">{returnFormatTime(planStartTime)}</div>
      </div>
    </div>
  );
}
