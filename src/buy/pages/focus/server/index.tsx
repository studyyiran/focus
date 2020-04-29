import ajax from "../../../common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";
import { IHistoryFilter, ITodoItem } from "../context/interface";

/**
 * 首页相关
 * */
const serverName = "/studyTodo";
const testName = "/test";

const getTodayTodoUrl = serverName + "/getTodayList"; // 获取today列表
const getTodayDoneUrl = serverName + "/getTodayDoneList"; // 获取today列表
const newStudyTodoItemUrl = serverName + "/newStudyTodoItem"; // 新增口
const changeStudyItemStatusUrl = serverName + "/changeStudyItemStatus"; // 完成任务接口

const ChangeTodoItemUrl = serverName + "/ChangeTodoItem"; // 通用修改口
const deleteItemUrl = serverName + "/hideStudyItem"; // 通用删除口

const getHistoryByFilterUrl = serverName + "/getHistoryList"; // 获取全部的列表信息数据（根据筛选项。）

const getWishListUrl = serverName + "/getWishList"; // 获取心愿单
const getRelatedTodoListUrl = serverName + "/getRelatedTodoList";
const getTodayLearnThingUrl = serverName + "/getTodayLearnThing";

export default {
  changeStudyItemStatus: async (data: any) => {
    const res: any = await ajax.put(changeStudyItemStatusUrl, data);
    return res;
  },
  getTodayTodo: async () => {
    const res: any = await ajax.get(getTodayTodoUrl);
    return res;
  },
  getTodayDone: async () => {
    const res: any = await ajax.get(getTodayDoneUrl);
    return res;
  },
  postNewItem: async (data: ITodoItem) => {
    const res: any = await ajax.post(newStudyTodoItemUrl, data);
    return res;
  },
  getHistoryByFilter: async (filterInfo: IHistoryFilter) => {
    const res: any = await ajax.post(getHistoryByFilterUrl, { filterInfo });
    return res;
  },
  changeTodoItem: async (todo: ITodoItem) => {
    const res: any = await ajax.put(ChangeTodoItemUrl, todo);
    return res;
  },
  deleteItem: async (data: { id: string }) => {
    const res: any = await ajax.put(deleteItemUrl, data);
    return res;
  },
  getWishList: async () => {
    const res: any = await ajax.get(getWishListUrl);
    return res;
  },
  getRelatedTodoList: async () => {
    const res: any = await ajax.get(getRelatedTodoListUrl);
    return res;
  },
  getTodayLearnThing: async () => {
    const res: any = await ajax.get(getTodayLearnThingUrl);
    return res;
  }
};
