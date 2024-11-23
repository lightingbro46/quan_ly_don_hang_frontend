import React, { useState } from "react";
import { Select, Spin } from "antd";

const SearchInput = ({ loadFunction, placeholder, labelInKeys, isSearch = true, loadOptionsFirst = false, value, onChange }) => {
    const [options, setOptions] = useState([]);
    const [fetching, setFetching] = useState(false);

    let timeout;
    let currentValue;

    const fetchData = (value) => {
        setFetching(true);
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;
        console.log("curr", currentValue)
        const fetch = () => {
            loadFunction({ q: value })
                .then(res => {
                    console.log(res)
                    if (currentValue == value) {
                        const { results } = res;
                        console.log(results)
                        const data = results.map((item) => ({
                            value: item["id"],
                            label: `${labelInKeys.reduce((acc, cur) => (acc === "" ? item[cur] : acc + " - " + item[cur]), "")}`,
                        }));
                        console.log(data);
                        setOptions(data);
                        setFetching(false);
                    }
                })
                .catch(e => {
                    if (currentValue == value) {
                        setOptions([]);
                        setFetching(false);
                    }
                })
        }

        if (value) {
            timeout = setTimeout(fetch, 300);
        } else {
            setOptions([]);
            setFetching(false);
        }
    }

    const handleSearch = (newValue) => {
        fetchData(newValue);
    };
    const handleChange = (newValue) => {
        onChange?.(newValue);
    };

    return (
        <Select
            showSearch={isSearch}
            value={value}
            placeholder={placeholder}
            defaultActiveFirstOption={true}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            options={options || []}
        />
    )
}

export default SearchInput;