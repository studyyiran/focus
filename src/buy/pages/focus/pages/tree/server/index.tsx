import ajax from "buy/common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
const treeUrl = "/tree";
export const getTreeListUrl = treeUrl + "/getTreeList";
export const changeTargetNodePointUrl = treeUrl + "/changeTargetNodePoint";
export const getTreeShapeUrl = treeUrl + "/getTreeShape";
export const changeTreeShapeUrl = treeUrl + "/changeTreeShape";

async function getTreeList() {
  const res: any = await ajax.get(getTreeListUrl);
  return res;
}

async function changeTargetNodePoint(data : any) {
  const res: any = await ajax.post(changeTargetNodePointUrl, data);
  return res;
}

async function getTreeShape() {
  const res: any = await ajax.get(getTreeShapeUrl);
  return res;
}

async function changeTreeShape({nextTreeShape} : {nextTreeShape: any}) {
  const res: any = await ajax.post(changeTreeShapeUrl, {nextTreeShape});
  return res;
}

export const godTreeServer = {
  getTreeList,
  changeTargetNodePoint,
  getTreeShape,
  changeTreeShape,
}
