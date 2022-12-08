import rootAxios from "axios";
import { v4 as uniq } from "uuid";
import { API_ENDPOINT } from "../config";

let isRefreshing = false;
let failedQueue = [];

export const createRedirectURL = () => {};

const processQueue = (err, token) => {
  failedQueue.forEach(prom => {
    if (err) {
      prom.reject(err);
    } else prom.resolve(token);
  });
  failedQueue = [];
};

let cancelRequest = [];
export const isTokenCancelled = rootAxios.isCancel;
export const handleCancelRequest = (
  url = "pathname",
  msg = "Request was canceled"
) => {
  switch (url) {
    case "pathname":
      for (let i = 0; i < cancelRequest.length; i++) {
        cancelRequest[i].pathname === window.location.pathname &&
          cancelRequest[i].cancel(msg);
      }
      break;
    default:
      url = cancelRequest.find(req => req.url === url);
      url && url.cancel(msg);
      break;
  }
};
// You can setup  config for post and get with defualt authorization header
const axios = rootAxios.create({
  baseURL: API_ENDPOINT
});
axios.interceptors.request.use(function(config) {
  // config.headers = {
  //   Accept: config.headers["Accept"] || "application/json",
  //   "Content-Type": config.headers["Content-Type"] || "application/json",
  //   ...config.headers
  // };
  /delete|put|post/.test(config.method) && (config.withCredentials = true);
  if (config.headers["authorization"]) config.withCredentials = true;
  const source = rootAxios.CancelToken.source(); // create new source token on every request
  source.url = config.url;
  source.pathname = window.location.pathname;
  config.cancelToken = source.token;
  cancelRequest.push(source);
  return config;
});
axios.interceptors.response.use(
  response => {
    return Promise.resolve(response.data);
  },
  async err => {
    if (rootAxios.isCancel(err)) return Promise.reject(err);

    console.log(err.config.url, "rootAxios err url");
    const originalRequest = err.config;

    return Promise.reject(err.response ? err.response.data : err);
    // if (err.response?.status === 401) {
    //   console.log("401...");
    //   if (
    //     !originalRequest.role ||
    //     originalRequest._retry ||
    //     originalRequest._queued
    //   ) {
    //     console.log(
    //       "reject cos false role or queued or retrying",
    //       originalRequest.role,
    //       originalRequest._retry,
    //       originalRequest._queued
    //     );
    //     return Promise.reject("Encountered some error");
    //   }
    //   if (isRefreshing) {
    //     return new Promise(function(resolve, reject) {
    //       failedQueue.push({ resolve, reject });
    //     })
    //       .then(jwtToken => {
    //         originalRequest._queued = true;
    //         originalRequest.headers["authorization"] = "Bearer " + jwtToken;
    //         return axios.request(originalRequest);
    //       })
    //       .catch(_ => {
    //         return Promise.reject(err);
    //       });
    //   }
    //   originalRequest._retry = true;
    //   isRefreshing = true;
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get(
    //         `${API_ENDPOINT}/${originalRequest.role.toLowerCase()}/refresh-token`,
    //         {
    //           withCredentials: true,
    //           headers: {
    //             "Content-Type": "application/json"
    //           }
    //         }
    //       )
    //       .then(({ data }) => {
    //         console.log(data, "new-jwtToken");
    //         setCookieStore({
    //           jwtToken: data
    //         })
    //           .then(() => {
    //             processQueue(null, data);
    //             originalRequest.headers["authorization"] = "Bearer " + data;
    //             originalRequest.withCredentials = true;
    //             return resolve(axios.request(originalRequest));
    //           })
    //           .catch(err => {
    //             processQueue(err, null);
    //             return reject(err);
    //           });
    //       })
    //       .catch(err => {
    //         processQueue(err, null);
    //         return reject(err);
    //       })
    //       .finally(() => {
    //         isRefreshing = false;
    //       });
    //   });
    // } else if (err.response?.status === 403) {
    //   if (/\/u\/login/i.test(window.location.pathname))
    //     return Promise.reject(err);
    //   window.location.href = createRedirectURL();
    // } else return Promise.reject(err);
  }
);

export default axios;
