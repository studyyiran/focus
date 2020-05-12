import ajax from "buy/common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
const serverName = '/chunks'
export const getAllChunksUrl = serverName + "/getAllChunks";
export const startNewChunksUrl = serverName + "/startNewChunks";
export const addLearnRecordUrl = serverName + "/addLearnRecord";
export const changeOneRecordUrl = serverName + "/changeOneRecord";
export const getStudyBuffListUrl = serverName + "/getStudyBuffList";


export const storeChunksServer = {
  getAllChunks: async () => {
    const res: any = await ajax.get(getAllChunksUrl);
    return res;
  },
  startNewChunks: async (info: any) => {
    const res: any = await ajax.post(startNewChunksUrl, info);
    return res;
  },
  addLearnRecord: async (info: any) => {
    const res: any = await ajax.post(addLearnRecordUrl, info);
    return res;
  },
  changeOneRecord: async (info: any) => {
    const res: any = await ajax.put(changeOneRecordUrl, info);
    return res;
  },
  getStudyBuffList: async () => {
    const res: any = await ajax.get(getStudyBuffListUrl);
    return res;
  }
};
