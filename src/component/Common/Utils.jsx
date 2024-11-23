import qs from "qs";

const apiSearch = ({ url, method = "GET", queryParams, bodyParams }) => {
    return new Promise((resolve, reject) => {
        let fetchUrl = url;
        if (queryParams) {
            fetchUrl += ("?" + qs.stringify(queryParams));
        }
        let options = { method };
        if (bodyParams) {
            options.body = JSON.stringify(bodyParams);
        }
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject('Error fetching data:', err));
    })
}

const handleActionCallback = (actionFunction, inputData) => {
    console.log("Input data:", inputData);
    return new Promise((resolve, reject) => {
        if (actionFunction) {
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
        } else {
            resolve();
        }
    })
}

export {
    apiSearch,
    handleActionCallback,
};