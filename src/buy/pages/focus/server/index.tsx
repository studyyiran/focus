import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
const serverName = "/studyTodo";

const getTodayTodoUrl = serverName + "/getTodayList"; // 获取today列表
const getTodayDoneUrl = serverName + "/getTodayDoneList"; // 获取today列表
const postNewItemUrl = serverName + "/newStudyTodoItem"; // 新增口
const changeStudyItemStatusUrl = serverName + "/changeStudyItemStatus"; // 完成任务接口

const changeItemContentUrl = serverName + "/changeContent"; // 通用修改口
const deleteItemUrl = serverName + "/hideStudyItem"; // 通用删除口

const getHistoryByFilterUrl = serverName + "/hideStudyItem"; // 获取全部的列表信息数据（根据筛选项。）

const getWithList = serverName + "/getWithList"; // 获取心愿单

export async function changeStudyItemStatus(data: any) {
  const res: any = await ajax.put(changeStudyItemStatusUrl, data);
  return res;
}

export async function getTodayTodo() {
  const res: any = await ajax.get(getTodayTodoUrl);
  return res;
}

export async function getTodayDone() {
  const res: any = await ajax.get(getTodayDoneUrl);
  return res;
}

export async function postNewItem(data: { content: string }) {
  const res: any = await ajax.post(postNewItemUrl, data);
  return res;
}

export async function getHistoryByFilter(filterInfo: any) {
  const res: any = await ajax.post(getHistoryByFilterUrl, filterInfo);
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
