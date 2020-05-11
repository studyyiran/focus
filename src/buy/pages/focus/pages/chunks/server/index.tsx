import ajax from "buy/common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
const serverName = '/chunks'
export const getAllChunksUrl = serverName + "/getAllChunks";
export const addLearnRecordUrl = serverName + "/addLearnRecord";
export const changeOneRecordUrl = serverName + "/changeOneRecord";
export const startNewChunksUrl = serverName + "/startNewChunks";

export const storeChunksServer = {
  getAllChunks: async () => {
    const res: any = await ajax.get(getAllChunksUrl);
    return res;
  }
};
