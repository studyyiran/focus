import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
const serverName = "/studyTodo";
const TestAjaxUrl = serverName + "/getList";
const postNewItemUrl = serverName + "/newStudyTodoItem";
const changeItemContentUrl = serverName + "/changeContent";
const deleteItemUrl = serverName + "/hideStudyItem";

export async function getTestAjaxResult() {
  const res: any = await ajax.get(TestAjaxUrl);
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
