import React from "react";
import "./index.less";
import { tagArr } from "../../config/tagArrConfig";
import { IListItem } from "../../context/interface";
import { returnFormatTime } from "./util";
import {useGetOpenAddIntoTargetModal} from "../../pages/history/components/useGetOpenAddIntoTargetModal";


interface ITodoLine extends IListItem {
  onClickButton1?: any;
  haveDone?: boolean;

  todoFinishDate?: string;
  todoPlanStartTime?: string;
  todoRelateTargetTime?: string;
  todoCreateTime?: string;
}

export function TodoLine(props: ITodoLine) {
  const {
    tag,
    content,
    onClickButton1,
    _id,
    createTime,
    finishDate,
    planStartTime,
    haveDone,
    relatedTargetName,

    todoFinishDate,
    todoPlanStartTime,
    todoRelateTargetTime,
    todoCreateTime
  } = props;
  const findTarget = (tagArr as any).find((tagItem: any) => {
    return tagItem.value === tag;
  });
  // 这部的目的是？
  const tagName = findTarget ? findTarget.name : tag;

  function moreContent(content: string) {
    let string = "";
    for (let i = 0; i < 1; i++) {
      string += content;
    }
    return string;
  }

  function calcTime() {
    if (todoRelateTargetTime) {
      return returnFormatTime(
        todoFinishDate ||
          todoPlanStartTime ||
          todoRelateTargetTime ||
          todoCreateTime
      );
    } else {
      return returnFormatTime(finishDate || planStartTime || createTime);
    }
  }

  const openAddIntoTargetModal = useGetOpenAddIntoTargetModal(_id, () => {

  });

  return (
    <div className={`l-task-bg todo-line ${haveDone ? "task-checked" : ""}`}>
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
        <div className="target-container">
          {relatedTargetName ? (
            relatedTargetName
          ) : (
            <span className="tag-container" onClick={openAddIntoTargetModal}>
              + target
            </span>
          )}
        </div>
        <div className="date">{calcTime()}</div>
      </div>
    </div>
  );
}

