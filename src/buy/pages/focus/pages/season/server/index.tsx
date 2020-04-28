import ajax from "buy/common/utils/ajax";

/**
 * 首页相关
 * */
export const getSeasonListUrl = "/season/getSeasonList";
export const startNewSeasonUrl = "/season/startNewSeason";
export const addTodoIntoSeasonUrl = "/season/addTodoIntoSeason";
export const addStudyBuffRecordUrl = "/season/addStudyBuffRecord";
export const getStudyBuffRecordUrl = "/season/getStudyBuffRecord";

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

async function getStudyBuffRecord() {
  const res: any = await ajax.get(getStudyBuffRecordUrl);
  return res;
}

async function addStudyBuffRecord(info: any) {
  const res: any = await ajax.post(addStudyBuffRecordUrl, info);
  return res;
}

export const seasonServer = {
  startNewSeason,
  addTodoIntoSeason,
  getStudyBuffRecord,
  addStudyBuffRecord,
  getSeasonList
}