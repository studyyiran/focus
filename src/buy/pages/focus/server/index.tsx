import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
const serverName = "/studyTodo";
const getTodayTodoUrl = serverName + "/getList";
const postNewItemUrl = serverName + "/newStudyTodoItem";
const changeItemContentUrl = serverName + "/changeContent";
const deleteItemUrl = serverName + "/hideStudyItem";

// 开始新增价格不太一样的接口
export async function getTodayTodo() {
  const res: any = await ajax.get(getTodayTodoUrl);
  return res;
}

export async function postNewItem(data: { content: string }) {
  const res: any = await ajax.post(postNewItemUrl, data);
  return res;
}

export async function changeItemContent(data: { id: string; content: string }) {
  const res: any = await ajax.put(changeItemContentUrl, data);
  return res;
}

export async function deleteItem(data: { id: string }) {
  const res: any = await ajax.put(deleteItemUrl, data);
  return res;
}
