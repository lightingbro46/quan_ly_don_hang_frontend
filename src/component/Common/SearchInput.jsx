import { useState, useRef, useMemo } from "react";
import { Select, Spin, Empty } from "antd";

const SearchInput = ({ loadFunction, labelInKeys, value, onChange, ...props }) => {
    const [options, setOptions] = useState([]);
    const [fetching, setFetching] = useState(false);

    let timeout;
    let currentValue;

    const fetchData = (string) => {
        setFetching(true);
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = string;
        console.log("curr", currentValue)
        const fetch = () => {
            loadFunction({ q: string })
                .then(res => {
                    if (currentValue == string) {
                        console.log(res.results)
                        const data = res["results"].map((item) => ({
                            value: item["id"],
                            label: `${labelInKeys.reduce((acc, cur) => (acc === "" ? item[cur] : (acc + " - " + item[cur])), "")}`,
                        }));
                        setOptions(data);
                        setFetching(false);
                    }
                })
                .catch(e => {
                    if (currentValue == string) {
                        setOptions([]);
                        setFetching(false);
                    }
                })
        }

        if (string) {
            timeout = setTimeout(fetch, 500);
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
            showSearch
            value={value}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={fetching ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            options={options}
            {...props}
        />
    )
}

const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {...props}
            options={options}
        />
    );
}


export default SearchInput;