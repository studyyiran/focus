import React, { useContext } from "react";
import { Select } from "antd";
import {
  dateToTimeRangeObj,
  defaultTimeSelectRangeInfo,
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

const { Option } = Select;
export function FilterPart() {
  const myFocusContext = useContext(MyFocusContext);
  const {
    changeHistoryFilter,
    myFocusContextValue
  } = myFocusContext as IMyFocusContext;
  const { historyFilter } = myFocusContextValue;
  // 这是一个通用的回调
  function onChangeSelectHandler(type: string, value: any) {
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
          handler: (uselessType: any, value: any) => {
            onChangeSelectHandler("timeRangeInfo", dateToTimeRangeObj(value));
          }
        },
        {
          key: "timeRangeSelect",
          arrSource: timeRangeDateArr,
          handler: (uselessType: any, value: any) => {
            onChangeSelectHandler("timeRangeInfo", {
              start: -1 * value,
              end: value + 1
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
                } else if (defaultTimeSelectRangeInfo.hasOwnProperty(key)) {
                  defaultValue = (defaultTimeSelectRangeInfo as any)[key];
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
