import React, { useContext } from "react";
import "./index.less";
import { getCurrentTargetName, TargetInfoContext } from "../../context";
import { locationHref } from "../../../../../../common/utils/routerHistory";
import { Tabs } from "../../../../components/tabs";
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
      title: "梦想清单",
      url: "",
      key: "/focus/target-info",
      children: targetList.map(target => {
        return (
          <li
            onClick={() => {
              setCurrentTargetInfo(target._id);
              locationHref("");
            }}
          >
            {getCurrentTargetName(target)}
          </li>
        );
      })
    },
    {
      title: "chunks",
      url: "",
      key: "/focus/chunks",
      children: () => null
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
    }
  ];

  return (
    <div className="slider-part">
      <Tabs
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
