import ajax from "buy/common/utils/ajax";
import { getTestAjaxResultMock } from "./mock";

/**
 * 首页相关
 * */
export const TestAjaxUrl = "/reviewPart/getReviewList";

export const storeTestNameServer = {
  getTestAjaxResult: async () => {
    const res: any = await ajax.get(TestAjaxUrl);
    return getTestAjaxResultMock;
    return res;
  }
};
