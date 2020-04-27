import React from "react";
import { ISeason, ISeasonState } from "../../context";
import "./index.less";
import { levelupModal } from "../../../targetPage/components/renderLevelUpButtons";
import { Button, Select } from "antd";
import { ISeasonActions } from "../../context/useGetActions";
const { Option } = Select;

interface ISeasonLine extends ISeason {
  todayLearnThingList: ISeasonState["todayLearnThingList"];
  addTodoIntoSeason: ISeasonActions["addTodoIntoSeason"];
}
// addTodoIntoSeason={addTodoIntoSeason} todayLearnThingList={todayLearnThingList}
export const SeasonLine: React.FC<ISeasonLine> = props => {
  console.log(props);
  const { _id, slots, todayLearnThingList, addTodoIntoSeason } = props;
  // const fillSlots : any[] = new Array(4).fill({})

  const fillSlotsFunc = () => {
    const showCount = 4;
    return new Array(showCount).fill({}).map((item, index) => {
      const slotInfo = slots[index];
      if (slotInfo) {
        const { isLock } = slotInfo;
        if (isLock) {
          return {
            type: "lock"
          };
        } else {
          if (index % 2 === 0) {
            return {
              type: "study"
            };
          } else {
            return {
              type: "review"
            };
          }
        }
      } else {
        return { type: "none" };
      }
    });
  };

  const fillSlots = fillSlotsFunc();
  console.log(fillSlots)
  return (
    <div className="season-line-container">
      <button
        onClick={() => {
          // 1 进入这个页面会拉waitList
          // 2 根据最后一个的类别，筛选出来用户可以选择的范围。
          // 3 用户选定后，将两个id扔上去。
          addTodoIntoSeasonHandler(_id);
        }}
      >
        add into
      </button>
      <div className="season-line">
        {fillSlots.map((config: any) => {
          return <Slot {...config} />;
        })}
      </div>
    </div>
  );

  function addTodoIntoSeasonHandler(seasonId: any) {
    levelupModal(
      "useless",
      (info: any) => {
        addTodoIntoSeason({ todoId: info.todoId, seasonId });
      },
      [
        {
          id: "todoId",
          initialValue: "",
          rules: [
            {
              required: true,
              message: "not empty"
            }
          ],
          renderFormEle: () => (
            <Select>
              {todayLearnThingList.map(({ content, _id }) => {
                return (
                  <Option value={_id} key={_id}>
                    {content}
                  </Option>
                );
              })}
            </Select>
          )
        },
        {
          renderFormEle: () => <Button htmlType="submit">submit</Button>
        }
      ]
    );
  }
};

interface ISlot {
  type: String;
}

const Slot: React.FC<ISlot> = props => {
  const { type } = props;
  const config: any = {
    none: {
      src: require("./res/off.jpg")
    },
    study: {
      src: require("./res/study.jpg")
    },
    review: {
      src: require("./res/review.jpg")
    },
    lock: {
      src: require("./res/lock.jpg")
    }
  };
  return (
    <div className="season-slot">
      <img src={config[type as any].src} />
    </div>
  );
};
