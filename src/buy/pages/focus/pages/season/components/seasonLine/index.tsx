import React from "react";
import { ISeason } from "../../context";
import './index.less';

interface ISeasonLine extends ISeason{

}

export const SeasonLine: React.FC<ISeasonLine> = props => {
  console.log(props)
  const {_id, slots} = props
  // const fillSlots : any[] = new Array(4).fill({})

  const fillSlotsFunc = () => {
    let fillSlots : any[] = []
    for (let i = 0; i < 4; i++) {
      if (!slots[i]) {
        if (i === 0) {
          fillSlots[i] = {
            haveStudy: true,
            haveReview: false,
          }
        } else {
          fillSlots[i] = {

          }
        }
      }
    }
    return fillSlots
  }
  const fillSlots = fillSlotsFunc();
  return <div className="season-line">{fillSlots.map((config) => {
    return <Slot {...config} />
  })}</div>
}

interface ISlot {
  haveStudy?: Boolean,
  haveReview?: Boolean
}

const Slot: React.FC<ISlot> = props => {
  const {haveStudy, haveReview} = props
  const haveStudyIcon =  require('./res/study.jpg')
  const haveReviewIcon =  require('./res/review.jpg')
  const noneIcon =  require('./res/off.jpg')
  return <div className="season-slot">
    {haveStudy ? <img src={haveStudyIcon} /> : <img src={noneIcon} />}
    {haveReview ? <img src={haveReviewIcon} /> : <img src={noneIcon} />}
  </div>
}