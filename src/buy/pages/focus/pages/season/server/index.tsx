import ajax from "buy/common/utils/ajax";

/**
 * 首页相关
 * */
export const getSeasonListUrl = "/season/getSeasonList";
export const startNewSeasonUrl = "/season/startNewSeason";
export const addTodoIntoSeasonUrl = "/season/addTodoIntoSeason";

async function getSeasonList() {
  const res: any = await ajax.get(getSeasonListUrl);
  return res;
}

async function startNewSeason(info: any) {
  const res: any = await ajax.post(startNewSeasonUrl, info);
  return res;
}

async function addTodoIntoSeason(info: any) {
  const res: any = await ajax.post(addTodoIntoSeasonUrl, info);
  return res;
}

export const seasonServer = {
  startNewSeason,
  addTodoIntoSeason,
  getSeasonList
}
