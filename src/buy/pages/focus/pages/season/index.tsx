import React, { useContext, useEffect } from "react";
import "./index.less";
import {
  IBuffRecord,
  ISeasonContext,
  ISeasonState,
  SeasonContext
} from "./context";
import { levelupModal } from "../targetPage/components/renderLevelUpButtons";
import { SeasonLine } from "./components/seasonLine";
import { MagicTimer } from "./components/magicTimer";
import moment from "moment";

export function SeasonPage() {
  // 引入context
  const seasonContext = useContext(SeasonContext);
  const {
    seasonContextValue,
    getSeasonList,
    startNewSeason,
    getTodayLearnThing,
    addTodoIntoSeason,
    getStudyBuffRecord,
    finishSeason
  } = seasonContext as ISeasonContext;
  // 从context中获取值
  const { seasonList, todayLearnThingList, buffRecord } = seasonContextValue;
  // local发起请求
  useEffect(() => {
    getSeasonList();
    getTodayLearnThing();
    getStudyBuffRecord();
  }, [getSeasonList, getTodayLearnThing]);
  // 渲染
  console.log(buffRecord);

  function addNewSeasonHandler() {
    levelupModal("name", ({ name }: any) => {
      startNewSeason({ name });
    });
  }

  return (
    <div className="season-page">
      <section>
        <h2>season List</h2>
        <table>
          <thead>
            <tr>
              <th>seasonName</th>
              <th>seasonCreateTime</th>
              <th>seasonSlots</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
        {seasonList.map(props => (
          <SeasonLine
            {...props}
            finishSeason={finishSeason}
            addTodoIntoSeason={addTodoIntoSeason}
            todayLearnThingList={todayLearnThingList}
          />
        ))}
        <div>
          <button onClick={addNewSeasonHandler}>add new season</button>
        </div>
        <MagicTimer />
        <RenderBuffRecord buffRecordList={buffRecord} />
      </section>
    </div>
  );
}

interface IRenderBuffRecord {
  buffRecordList: IBuffRecord[];
}

const RenderBuffRecord: React.FC<IRenderBuffRecord> = props => {
  const { buffRecordList } = props;
  return (
    <section className="buff-record">
      <table>
        <thead>
          <tr>
            <th>createTime</th>
            <th>type</th>
            <th>continueTime</th>
          </tr>
        </thead>
        <tbody>
          {buffRecordList.map(item => {
            const { type, continueTime, createTime } = item;
            return (
              <tr>
                <td>{moment(createTime as any).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td>{type}</td>
                <td>{continueTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
