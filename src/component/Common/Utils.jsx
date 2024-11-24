import { message } from "antd";
import qs from "qs";

const apiSearch = ({ url, method = "GET", queryParams, bodyParams }) => {
    return new Promise((resolve, reject) => {
        let fetchUrl = url;
        if (queryParams) {
            fetchUrl += ("?" + qs.stringify(queryParams));
        }
        let options = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        };
        if (bodyParams) {
            options.body = JSON.stringify(bodyParams);
        }
        fetch(fetchUrl, options)
            .then(response => {
                if (response.ok) {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        return response.json();
                    } else {
                        return response.text();
                    }
                }
                else
                    throw new Error("Fetch data failed " + response.status);
            })
            .then(data => resolve(data))
            .catch(e => reject(e));
    })
}

const handleActionCallback = (actionFunction, inputData) => {
    console.log("Input data:", inputData);
    return new Promise((resolve, reject) => {
        message.loading(`Đang xử lý...`);
        actionFunction(inputData)
            .then((res) => {
                message.success(`Thao tác thành công!`);
                resolve();
            })
            .catch(e => {
                console.log(e);
                message.error(`Thao tác thất bại`);
                reject(e);
            })
    })
}

export {
    apiSearch,
    handleActionCallback,
};