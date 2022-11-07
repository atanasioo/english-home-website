import axios from "axios";
import Cookies from 'js-cookie'
import buildLink from "./urls"

if (typeof Cookies.get("api-token") == "undefined") {
    let requestBody = {
        client_id: "shopping_oauth_client",
        client_secret: "shopping_oauth_secret",
        source_id : 1

    };
    let requestHeader = {
        Authorization: "Basic dGVzdGNsaWVudDp0ZXN0cGFzcw==",
    };
    axios
        .post(buildLink("token"), requestBody, {
            headers: requestHeader,
        })
        .then((response) => {

            Cookies.set("api-token", response.data.access_token, { expires: 7 });
            window.location.reload();
        });
}
const _axios = axios.create({
    headers: { 'Authorization': 'Bearer ' + Cookies.get("api-token") }
});

_axios.interceptors.request.use(function(config) {
    return config;
}, function(error) {
    return Promise.reject(error);
});
_axios.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if (typeof error.response != "undefined" && error?.response?.status === 401 ) {

        let requestBody = {
            client_id: "shopping_oauth_client",
            client_secret: "shopping_oauth_secret",
            source_id : 1

        };
        let requestHeader = {
            Authorization: "Basic dGVzdGNsaWVudDp0ZXN0cGFzcw==",
        };
        axios
            .post(buildLink("token"), requestBody, {
                headers: requestHeader,
            })
            .then((response) => {

                Cookies.set("api-token", response.data.access_token, { expires: 7 });
                window.location.reload();
            });
    }

    return Promise.reject(error);
});


export default _axios