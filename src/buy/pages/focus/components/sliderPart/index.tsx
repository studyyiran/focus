import React, { useContext } from "react";
import "./index.less";
import {
  getCurrentTargetName,
  TargetInfoContext
} from "../../pages/targetPage/context";
import { locationHref } from "../../../../common/utils/routerHistory";
import { Tabs } from "../../components/tabs";
import { useLocation } from "react-router";
const { TabPane } = Tabs;

interface ISliderPart {
  onClickSlidePart?: any;
}

export const SliderPart: React.FC<ISliderPart> = props => {
  const targetInfoContext = useContext(TargetInfoContext);
  const { targetInfoContextValue, setCurrentTargetInfo } = targetInfoContext;
  // 从context中获取值
  let { targetList, currentTargetInfo } = targetInfoContextValue;
  let location = useLocation();
  const config = [
    {
      title: "target",
      url: "",
      key: "/focus/target-info",
      children: targetList.map(target => {
        return (
          <li
            data-select={currentTargetInfo._id === target._id ? "active" : ""}
            onClick={() => {
              setCurrentTargetInfo(target._id);
              locationHref("/focus/target-info");
            }}
          >
            <span className="title">{getCurrentTargetName(target)}</span>
          </li>
        );
      })
    },
    {
      title: "tree",
      url: "",
      key: "/focus/tree",
      children: () => null
    },
    {
      title: "season",
      url: "",
      key: "/focus/season",
      children: () => null
    },
    {
      title: "chunks",
      url: "",
      key: "/focus/chunks",
      children: () => null
    }
  ];

  return (
    <div className="slider-part">
      <Tabs
        activeKey={location ? location.pathname : ""}
        onChange={key => {
          locationHref(key);
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
