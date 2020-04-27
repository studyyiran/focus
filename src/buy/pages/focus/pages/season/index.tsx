import React, { useContext, useEffect } from "react";
import "./index.less";
import { ISeasonContext, SeasonContext } from "./context";
import { levelupModal } from "../targetPage/components/renderLevelUpButtons";
import { SeasonLine } from "./components/seasonLine";


export function SeasonPage() {
  // 引入context
  const seasonContext = useContext(SeasonContext);
  const {
    seasonContextValue,
    getSeasonList,
    startNewSeason,
    getTodayLearnThing,
    addTodoIntoSeason
  } = seasonContext as ISeasonContext;
  // 从context中获取值
  const { seasonList, todayLearnThingList } = seasonContextValue;
  // local发起请求
  useEffect(() => {
    getSeasonList();
    getTodayLearnThing();
  }, [getSeasonList, getTodayLearnThing]);
  // 渲染
  console.log(seasonList);
  console.log(todayLearnThingList);

  function addNewSeasonHandler() {
    levelupModal("name", ({ name }: any) => {
      console.log(name);
      startNewSeason({ name });
    });
  }

  return (
    <div className="season-page">
      <section>
        <h2>season List</h2>
        {seasonList.map(props => (
          <SeasonLine {...props} addTodoIntoSeason={addTodoIntoSeason} todayLearnThingList={todayLearnThingList} />
        ))}
        <div>
          <button onClick={addNewSeasonHandler}>add new season</button>
        </div>
      </section>
    </div>
  );
}
