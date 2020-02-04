/**
 * 首页相关
 * */
import ajax from "../../../../../common/utils/ajax";
const targetUrl = "/target";
const targetRelatedTodoUrl = "/targetRelatedTodo"
export const getTargetRelatedTodoUrl = targetRelatedTodoUrl + "/getList";
export const targetRelateUrl = targetUrl + "/targetRelate";
export const addNewTargetUrl = targetUrl + "/addNewTarget";
export const getTargetListUrl = targetUrl + "/getTargetList";

async function getTargetRelatedTodo() {
  const res: any = await ajax.get(getTargetRelatedTodoUrl);
  return res;
}

async function addNewTarget(data: any) {
  const res: any = await ajax.post(addNewTargetUrl, data);
  return res;
}

async function addTargetRelate(data: any) {
  const res: any = await ajax.post(targetRelateUrl, data);
  return res;
}

async function getTargetList() {
  const res: any = await ajax.get(getTargetListUrl);
  return res;
}


export const targetInfoServer = {
  getTargetRelatedTodo,
  addNewTarget,
  addTargetRelate,
  getTargetList,
}

