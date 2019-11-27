import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
const serverName = "/studyTodo";

// 获取today列表
const getTodayTodoUrl = serverName + "/getList";

// 删除，修改接口
const changeItemContentUrl = serverName + "/changeContent";
const deleteItemUrl = serverName + "/hideStudyItem";

// 完成任务接口
const changeStudyItemStatusUrl = serverName + "/changeStudyItemStatus";

// 新增口
const postNewItemUrl = serverName + "/newStudyTodoItem";

// 新增一个常规任务
const addTodayTodo = serverName + "/newStudyTodoItem";
// 新增一个完成的任务。
const addTodayFinish = serverName + "/newStudyTodoItem";
// 新增一个tag为review的任务。(直接使用原来的任务的字段。)
const addTodayReview = serverName + "/newStudyTodoItem";

// 为明日新增一个tag为review的任务。(直接使用原来的任务的字段。）
const addTomorrowReview = serverName + "/newStudyTodoItem";
const addTomorrowTodo = serverName + "/newStudyTodoItem";


// 开始新增价格不太一样的接口

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
