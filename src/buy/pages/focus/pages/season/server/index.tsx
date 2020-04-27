import ajax from "buy/common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
export const getSeasonListUrl = "/season/getSeasonList";

async function getSeasonList() {
  const res: any = await ajax.get(getSeasonListUrl);
  return res;
}

export const seasonServer = {
  getSeasonList
}
