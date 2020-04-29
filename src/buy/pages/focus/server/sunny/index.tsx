import ajax from "../../../../common/utils/ajax";

/**
 * 首页相关
 * */
const serverName = "/sunny";

const getUserSunnyUrl = serverName + "/getUserSunny";

export const sunnyServer = {
  getUserSunny: async () => {
    const res: any = await ajax.get(getUserSunnyUrl);
    return res;
  },
};
