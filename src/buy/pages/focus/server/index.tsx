import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
const serverName = "/studyTodo";

const getTodayTodoUrl = serverName + "/getTodayList";// 获取today列表
const getTodayDoneUrl = serverName + "/getTodayDoneList";// 获取today列表
const postNewItemUrl = serverName + "/newStudyTodoItem";// 新增口
const changeStudyItemStatusUrl = serverName + "/changeStudyItemStatus";// 完成任务接口


const changeItemContentUrl = serverName + "/changeContent"; // 通用修改口
const deleteItemUrl = serverName + "/hideStudyItem"; // 通用删除口



export async function changeStudyItemStatus(data: any) {
  const res: any = await ajax.put(changeStudyItemStatusUrl, data);
  return res;
}

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
