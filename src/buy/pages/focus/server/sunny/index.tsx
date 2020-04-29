import ajax from "../../../../common/utils/ajax";

/**
 * 首页相关
 * */
const serverName = "/sunny";

const getUserSunnyUrl = serverName + "/getUserSunny";
const changeUserSunnyUrl = serverName + "/changeUserSunny";
const loginSunnyUrl = serverName + "/loginSunny";

export const sunnyServer = {
  getUserSunny: async () => {
    const res: any = await ajax.get(getUserSunnyUrl);
    return res;
  },
  changeUserSunny: async (info: any) => {
    const res: any = await ajax.post(changeUserSunnyUrl, info);
    return res;
  },
  loginSunny: async () => {
    const res: any = await ajax.get(loginSunnyUrl);
    return res;
  },
};
