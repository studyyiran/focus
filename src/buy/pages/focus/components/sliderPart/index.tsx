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
  let { targetList } = targetInfoContextValue;

  const config = [
    {
      title: "target",
      url: "",
      key: "/focus/target-info",
      children: targetList.map(target => {
        return (
          <li
            onClick={() => {
              setCurrentTargetInfo(target._id);
              locationHref("/focus/target-info");
            }}
          >
            {getCurrentTargetName(target)}
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

  let location = useLocation();
  console.log(location);
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
              {children}
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
