/**
 * 首页相关
 * */
import ajax from "../../../../../common/utils/ajax";
const targetUrl = "/target";
const targetRelatedTodoUrl = "/targetRelatedTodo"
export const getTargetRelatedTodoUrl = targetRelatedTodoUrl + "/getList";
export const addNewTargetUrl = targetUrl + "/addNewTarget";

async function getTargetRelatedTodo() {
  const res: any = await ajax.get(getTargetRelatedTodoUrl);
  return res;
}

async function addNewTarget(data: any) {
  const res: any = await ajax.post(addNewTargetUrl, data);
  return res;
}

export const targetInfoServer = {
  getTargetRelatedTodo,
  addNewTarget,
}

