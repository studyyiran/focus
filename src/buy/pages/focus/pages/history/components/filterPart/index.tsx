import React, { useContext } from "react";
import { Select } from "antd";
import { IMyFocusContext, MyFocusContext } from "../../../../context";
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
            function make(a: number, b: number) {
              return {
                start: a,
                end: b
              };
            }
            let obj = {};
            switch (value) {
              case "today":
                obj = make(0, 1);
                break;
              case "yesterday":
                obj = make(-1, 1);
                break;
              case "week":
                obj = make(-7, 8);
                break;
              case "month":
                obj = make(-30, 31);
                break;
              case "year":
                obj = make(-365, 366);
                break;
            }
            onChangeSelectHandler(uselessType, obj);
          }
        },
        {
          key: "timeRangeSelect",
          arrSource: timeRangeDateArr,
          handler: (uselessType: any, value: any) => {
            onChangeSelectHandler("timeRange", {
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
                return (
                  <Select
                    defaultValue={(historyFilter as any)[key]}
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
