import React, { useContext, useState } from "react";
import "./index.less";
import {
  getCurrentTargetName,
  TargetInfoContext
} from "../../pages/targetPage/context";
import { locationHref } from "../../../../common/utils/routerHistory";
import { Tabs } from "../../components/tabs";
import { useLocation } from "react-router";
import { useShowNewTodoModal } from "../newTodoModal";
import { sunnyType } from "../../config/tagArrConfig";
import { Button, Popover } from "antd";
import { RenderTargetLevelUpButton } from "../../pages/targetPage/components/renderLevel";
const { TabPane } = Tabs;

interface ISliderPart {
  onClickSlidePart?: any;
}

export const SliderPart: React.FC<ISliderPart> = props => {
  const targetInfoContext = useContext(TargetInfoContext);
  const {
    targetInfoContextValue,
    setCurrentTargetInfo,
    addNewTarget
  } = targetInfoContext;
  // 从context中获取值
  let { targetList, currentTargetInfo } = targetInfoContextValue;
  const [currentKey, setCurrentKey] = useState("0");
  console.log(targetList);
  let location = useLocation();
  const config = [
    {
      title: "目标",
      url: "/focus/target-info",
      key: "0",
      children: targetList
        .map(target => {
          return (
            <li
              className="line-with-edit"
              data-select={
                location.pathname === "/focus/target-info" &&
                currentTargetInfo._id === target._id
                  ? "active"
                  : ""
              }
            >
              <span
                className="title"
                onClick={() => {
                  setCurrentTargetInfo(target._id);
                  locationHref("/focus/target-info");
                }}
              >
                {getCurrentTargetName(target)}
              </span>
              <Popover
                content={
                  <ul>
                    <li>
                      <RenderTargetLevelUpButton {...currentTargetInfo} />
                    </li>
                  </ul>
                }
                trigger="click"
                className="edit"
              >
                <span>+</span>
              </Popover>
            </li>
          );
        })
        .concat([
          <li
            key="submit-target"
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
            <span className="title"> + 新的target({sunnyType.newTarget})</span>
          </li>
        ])
    },
    {
      title: "成长树",
      url: "/focus/tree",
      key: "1",
      children: () => null
    },
    {
      title: "四季",
      url: "/focus/season",
      key: "2",
      children: () => null
    },
    {
      title: "记忆",
      url: "/focus/chunks",
      key: "3",
      children: () => null
    }
  ];

  return (
    <div className="slider-part">
      <Tabs
        activeKey={currentKey}
        onChange={key => {
          locationHref(config[key as any].url);
          setCurrentKey(key);
        }}
      >
        {config.map(({ key, title, children }) => {
          return (
            <TabPane key={key} tab={title}>
              <ul>{children}</ul>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
