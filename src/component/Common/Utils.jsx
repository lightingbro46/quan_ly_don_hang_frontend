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

export { apiSearch };