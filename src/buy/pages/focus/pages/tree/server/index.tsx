import ajax from "buy/common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
const treeUrl = "/tree";
export const getTreeListUrl = treeUrl + "/getTree";

async function getTreeList() {
  const res: any = await ajax.get(getTreeListUrl);
  return res;
}

export const godTreeServer = {
  getTreeList
}
