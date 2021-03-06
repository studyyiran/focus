import Axios from "axios";
import { globalStore } from "../store";
import { constValue } from "../constValue";
import { safeEqual } from "./util";
interface IAjax {
  get: (url: string, data?: any) => void;
  post: (url: string, data?: any) => void;
  put: (url: string, data?: any) => void;
  delete: (url: string, data?: any) => void;
  fetch: (config: any) => void;
}

const transUrl = (url: string) => {
  if (url.indexOf("http") !== -1) {
    return url;
  } else {
    return getRootApi("/api" + url);
  }
};

// 下面是所有api提取
const getRootApi = function(urlRoot: string) {
  let env = process.env.NODE_ENV;
  // let apiRoot = "";
  let apiRoot = "";
  switch (env) {
    case "development":
      // 便于进行mac端联调
      // apiRoot = "http://10.180.21.107:4000";
      // apiRoot = "http://139.224.2.112";
      apiRoot = "http://localhost:4000";
      break;
    case "production":
      apiRoot = "http://139.224.2.112";
  }
  // apiRoot = "http://139.224.2.112";
  return apiRoot + urlRoot;
};

const ajax: IAjax = {} as any;
ajax.post = function(url, data) {
  console.log("post ajax: ", transUrl(url), JSON.stringify(data));
  return ajax.fetch({
    url: transUrl(url),
    method: "post",
    data
  });
};

ajax.put = function(url, data) {
  console.log("put ajax: ", transUrl(url), JSON.stringify(data));
  return ajax.fetch({
    url: transUrl(url),
    method: "put",
    data
  });
};

ajax.delete = function(url, data) {
  console.log("delete ajax: ", transUrl(url), JSON.stringify(data));
  return ajax.fetch({
    url: transUrl(url),
    method: "DELETE",
    data: data
  });
};

ajax.get = function(url, data) {
  console.log("get ajax: ", transUrl(url), JSON.stringify(data));
  if (data) {
    let tag = "?";
    Object.keys(data).map(key => {
      url += `${tag}${key}=${data[key]}`;
      tag = "&";
    });
  }
  return ajax.fetch({
    url: transUrl(url),
    method: "GET",
    data
  });
};

ajax.fetch = function(config) {
  // 暂时插入处理函数
  if (globalStore) {
    const state = globalStore.getState();
    const authToken = state.token;
    // 11-21修改.默认主动设置
    if (authToken) {
      config.headers = {};
      config.headers[constValue.AUTHKEY] = authToken;
    }
  }

  return new Promise((resolve, reject) => {
    Axios(config)
      .then(res => {
        // 接收到
        if (res && res.data) {
          const { code, data, success, resultMessage } = res.data;
          if (Number(code) === 200 || success || Number(code) === 0) {
            // 常规接口
            resolve(res.data.data);
          } else if (
            res &&
            res.status &&
            res.status === 200 &&
            res.data &&
            !res.data.code
          ) {
            // 第三方接口(review)
            resolve(res.data);
          } else {
            // 接口业务性报错
            rejectError(config, reject, {
              code: code,
              resultMessage: resultMessage
            });
          }
        }
      })
      .catch(e => {
        if (e) {
          const { response } = e;
          if (response) {
            // 处理403
            const { data, status } = response;
            if (safeEqual(status, 403)) {
              if (safeEqual(data.code, 403)) {
                globalStore.dispatch({
                  type: "reduxSetToken",
                  value: null
                });
              }
            }
            // 这块为什么主动扔出去?
            // 这块应该加一个全局报错.
            rejectError(config, reject, {});
            // catch 404 500异常
          }
        }
      });
  });
};

function rejectError(config: any, reject: any, rejectInfo: any) {
  console.error("--ajax error--" + JSON.stringify(config));
  reject(rejectInfo);
}

export default ajax;
