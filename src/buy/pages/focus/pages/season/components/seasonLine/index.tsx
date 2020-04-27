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
    let fillSlots: any[] = [];
    for (let i = 0; i < 4; i++) {
      if (!slots[i]) {
        if (i === 0) {
          fillSlots[i] = {
            haveStudy: true,
            haveReview: true
          };
        } else {
          fillSlots[i] = {};
        }
      } else {
      }
    }
    return fillSlots;
  };

  const fillSlots = fillSlotsFunc();

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
        {fillSlots.map(config => {
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
  haveStudy?: Boolean;
  haveReview?: Boolean;
}

const Slot: React.FC<ISlot> = props => {
  const { haveStudy, haveReview } = props;
  const haveStudyIcon = require("./res/study.jpg");
  const haveReviewIcon = require("./res/review.jpg");
  const noneIcon = require("./res/off.jpg");
  return (
    <div className="season-slot">
      {haveStudy ? <img src={haveStudyIcon} /> : <img src={noneIcon} />}
      {haveReview ? <img src={haveReviewIcon} /> : <img src={noneIcon} />}
    </div>
  );
};
