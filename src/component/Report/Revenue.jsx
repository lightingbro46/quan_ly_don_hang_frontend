import { useEffect, useState } from "react";
import { DatePicker, Flex, Space } from "antd";
import LoadTable from "../Common/LoadTable";
import { apiSearch, handleActionCallback } from "../Common/Utils";

import { revenue_data } from "../mock";

const loadFunction = (queryParams) => {
    return new Promise((resolve, reject) => resolve(revenue_data))
    return apiSearch({
        url: `http://localhost:3000/api/trucks/list`,
        queryParams
    });
}

const Revenue = () => {
    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            key: "id",
            width: "10%",
        },
        {
            title: "Chỉ tiêu",
            dataIndex: "key",
            key: "key",
            width: "30%",
        },
        {
            title: "Số tiền",
            dataIndex: "value",
            key: "value",
            width: "70%",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
        }
    ]

    return (
        <>
            <LoadTable
                columns={columns}
                loadFunction={loadFunction}
                reload={reload}
            />
        </>
    )
}

export default Revenue;