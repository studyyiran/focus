/**
 * 首页相关
 * */
import ajax from "../../../../../common/utils/ajax";

export const getTargetRelatedTodoUrl = "/targetRelatedTodo/getList";

async function getTargetRelatedTodo() {
  const res: any = await ajax.get(getTargetRelatedTodoUrl);
  return res;
}

export const targetInfoServer = {
  getTargetRelatedTodo
}

