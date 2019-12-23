import React, { useContext } from "react";
import { Select } from "antd";
import {
  dateInfoArr,
  dateToTimeRangeObj,
  IMyFocusContext,
  MyFocusContext
} from "../../../../context";
import "./index.less";
import {
  tagArr,
  timeRangeArr,
  timeRangeDateArr,
  timeTargetArr
} from "../../../../config/tagArrConfig";
import { IHistoryFilter } from "../../../../context/interface";
import { safeEqual } from "../../../../../../common/utils/util";

const { Option } = Select;
export function FilterPart() {
  const myFocusContext = useContext(MyFocusContext);
  const {
    changeHistoryFilter,
    myFocusContextValue
  } = myFocusContext as IMyFocusContext;
  const { historyFilter } = myFocusContextValue;
  // 这是一个通用的回调
  function onChangeSelectHandler(
    type: string,
    value: IHistoryFilter["timeRangeInfo"] | string,
  ) {
    const changeResult = {} as any;
    changeResult[type] = value;
    changeHistoryFilter(changeResult);
  }

  const configArr = [
    {
      title: "Time Part",
      children: [
        {
          key: "timeTarget",
          arrSource: timeTargetArr,
          handler: onChangeSelectHandler
        },
        {
          key: "timeRange",
          arrSource: timeRangeArr,
          handler: (uselessType: any, value: string) => {
            onChangeSelectHandler("timeRangeInfo", dateToTimeRangeObj(value));
          }
        },
        {
          key: "timeRangeSelect",
          arrSource: timeRangeDateArr,
          handler: (uselessType: any, value: string) => {
            onChangeSelectHandler("timeRangeInfo", {
              start: -1 * Number(value),
              end: Number(value) + 1
            });
          }
        }
      ]
    },
    {
      title: "Tag Part",
      children: [
        { key: "tag", arrSource: tagArr, handler: onChangeSelectHandler }
      ]
    }
  ];

  function timeInfoToSelectvalue(
    info: IHistoryFilter["timeRangeInfo"],
    currentKey: string
  ) {
    if (currentKey === "timeRange") {
      const target =
        dateInfoArr.find(({ start }) => safeEqual(start, info.start)) ||
        dateInfoArr[0];
      return String(target.key);
    }
    if (currentKey === "timeRangeSelect") {
      return String(Number(info.start) * -1);
    }
    return "" as string;
  }
  return (
    <ul className="selector-list">
      {configArr.map(({ title, children }) => {
        return (
          <li>
            <section>
              <h3>{title}</h3>
              {children.map(({ key, arrSource, handler }) => {
                let defaultValue = "";
                if (historyFilter.hasOwnProperty(key)) {
                  const value = (historyFilter as any)[key];
                  if (typeof value === "string") {
                    defaultValue = value;
                  }
                } else if (key === "timeRange" || key === "timeRangeSelect") {
                  defaultValue = timeInfoToSelectvalue(historyFilter.timeRangeInfo, key);
                }
                return (
                  <Select
                    defaultValue={defaultValue}
                    onChange={handler.bind({}, key)}
                  >
                    {(arrSource as any).map((item: any) => {
                      return <Option value={item.value}>{item.name}</Option>;
                    })}
                  </Select>
                );
              })}
            </section>
          </li>
        );
      })}
    </ul>
  );
}
