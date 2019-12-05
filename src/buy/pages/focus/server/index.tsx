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

const getHistoryByFilterUrl = serverName + "/getHistoryList"; // 获取全部的列表信息数据（根据筛选项。）

const getWishListUrl = serverName + "/getWishList"; // 获取心愿单

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
  postNewItem: async (data: { content: string }) => {
    const res: any = await ajax.post(postNewItemUrl, data);
    return res;
  },
  getHistoryByFilter: async (filterInfo: any) => {
    const res: any = await ajax.post(getHistoryByFilterUrl, filterInfo);
    return res;
  },
  changeItemContent: async (data: any) => {
    const res: any = await ajax.put(changeItemContentUrl, data);
    return res;
  },
  deleteItem: async (data: { id: string }) => {
    const res: any = await ajax.put(deleteItemUrl, data);
    return res;
  },
  getWishList: async () => {
    const res: any = await ajax.get(getWishListUrl);
    return res;
  }
};
