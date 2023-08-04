import axios from "axios";
import Cookies from "js-cookie";
import buildLink from "./urls";
async function getToken() {
  excuting = true;
  let requestBody = {
    client_id: "shopping_oauth_client",
    client_secret: "shopping_oauth_secret",
    source_id: 1,
  };
  let requestHeader = {
    Authorization: "Basic dGVzdGNsaWVudDp0ZXN0cGFzcw==",
  };

  axios
    .post(buildLink("token"), requestBody, {
      headers: requestHeader,
    })
    .then((response) => {
      Cookies.set("api-token", response.data.access_token, { expires: 15 });

      excuting = false;
      window.location.reload();
    });
}
var excuting = false;
if (typeof Cookies.get("api-token") === "undefined") {
  if (!excuting) {
    getToken();
  }
}

const _axios = axios.create({
  headers: { Authorization: "Bearer " + Cookies.get("api-token") },
});

_axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// _axios.interceptors.response.use(
//   function (response) {

//     return response;
//   },
//   function (error) {

//     if (
//       typeof error.response !== "undefined" &&
//       error?.response?.status === 401
//     ) {
//       window.location.reload();

//       // getToken();
//       //     if(!excuting){
//       // getToken();}
//     }

//     return Promise.reject(error);
//   }
// );

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

_axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error?.response?.status === 401 &&
      !error.config._retry &&
      !isRefreshing
    ) {
      error.config._retry = true;
      isRefreshing = true;

      let requestBody = {
        client_id: "shopping_oauth_client",
        client_secret: "shopping_oauth_secret",
        source_id: 1,
      };
      let requestHeader = {
        Authorization: "Basic dGVzdGNsaWVudDp0ZXN0cGFzcw==",
      };

      try {
        // Request a new token
        const response = await axios.post(buildLink("token"), requestBody, {
          headers: requestHeader,
        });
        const newToken = response.data.access_token;

        // Update the token in cookie
        Cookies.set("api-token", response.data.access_token, { expires: 15 });

        // Trigger the onRefreshed callback to notify other requests
        onRefreshed(newToken);
        // Refresh the page
        window.location.reload();
        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return _axios(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default _axios;
