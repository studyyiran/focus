import Axios from "axios";
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
  let apiRoot = "http://118.31.42.201";
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
  return new Promise((resolve, reject) => {
    Axios(config)
      .then(res => {
        // 接收到
        if (res && res.data) {
          const { code, data, success, resultMessage } = res.data;
          // 简单处理
          resolve(res.data);
          if (Number(code) === 200 || success || Number(code) === 0) {
            resolve(res.data.data);
          } else {
            rejectError(config, reject, {
              code: code,
              resultMessage: resultMessage
            });
          }
        }
      })
      .catch(e => {
        // catch 404 500异常
        rejectError(config, reject, {});
      });
  });
};

function rejectError(config: any, reject: any, rejectInfo: any) {
  console.error("--ajax error--" + JSON.stringify(config));
  reject(rejectInfo);
}

export default ajax;
