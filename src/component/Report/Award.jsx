import React, { useEffect, useState } from "react";
import { Space, Flex, DatePicker, Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import LoadTable from "../Common/LoadTable";
import { apiSearch, handleActionCallback } from "../Common/Utils";

import { award_data } from "../mock";

const loadFunction = (queryParams) => {
    return new Promise((resolve, reject) => resolve(award_data))
    return apiSearch({
        url: `http://localhost:3000/api/trucks/list`,
        queryParams
    });
}

const Award = () => {
    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const columns = [
        {
            title: "Mã tài xế",
            dataIndex: "id",
            key: "id",
            width: "10%",
        },
        {
            title: "Tên tài xế",
            dataIndex: "name",
            key: "name",
            width: "20%",
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            key: "birthday",
            width: "10%",
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        },
        {
            title: "Số chuyến đã vận chuyển",
            dataIndex: "delivers",
            key: "delivers",
            width: "20%",
            align: 'center'
        },
        {
            title: "Số chuyến vượt chỉ tiêu",
            key: "delivers_overs",
            width: "20%",
            render: ((_, record) => `${record["delivers"] - 20 > 0 ? (record["delivers"] - 20) : 0}`),
            align: 'center'
        },
        {
            title: "Đạt chỉ tiêu khen thưởng",
            key: "is_award",
            width: "20%",
            render: ((_, record) => (
                (record["delivers"] - 20 > 0) &&
                (<Space size="small">
                    <Tag icon={<CheckCircleOutlined />} color="success" />
                </Space>)
            )),
            align: 'center'
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

export default Award;