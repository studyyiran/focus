import React from "react";
import RouterLink from "../../../../common-modules/components/routerLink";
import { SliderPart } from "../sliderPart";
import "./index.less";
import { useLocation } from "react-router";

interface ISliderLayoutPart {
  onCancelHandler?: any;
}

export const SliderLayoutPart: React.FC<ISliderLayoutPart> = ({
  onCancelHandler
}) => {
  const location = useLocation();

  const configArr = [
    {
      title: "今天",
      url: "/focus/today"
    },
    {
      title: "最近7天",
      url: "/focus/done"
    },
    {
      title: "历史",
      url: "/focus/history"
    }
  ];

  return (
    <div className="slider-layout-part" onClick={onCancelHandler}>
      <ul>
        {configArr.map(({ title, url }) => {
          return (
            <li data-select={url === location.pathname ? "active" : ""}>
              <RouterLink className="title" to={url}>
                {title}
              </RouterLink>
            </li>
          );
        })}
      </ul>
      <SliderPart />
    </div>
  );
};
