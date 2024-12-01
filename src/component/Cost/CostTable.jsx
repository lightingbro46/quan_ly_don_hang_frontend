import { useState } from "react";
import { Space, Tooltip, } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import CustomTable from "../Common/CustomTable";
import { apiSearch } from "../Common/Utils";

const columnsTable = ({ showUpdateModal, showDeleteModal }) =>
    [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "5%",
            fixed: "left"
        },
        {
            title: "Tỉnh",
            dataIndex: "province",
            key: "province",
            width: "20%",
            fixed: "left"
        },
        {
            title: "Tuyến đường",
            dataIndex: "arrival",
            key: "arrival",
            width: "35%",
            fixed: "left"
        },
        {
            title: "Báo giá",
            dataIndex: "pricing",
            key: "pricing",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
            width: "15%",
        },
        {
            title: "Chi phí",
            dataIndex: "tolls",
            key: "tolls",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
            width: "15%",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip placement="topLeft" title="Cập nhật">
                        <a onClick={() => showUpdateModal(record["id"])}>
                            <EditOutlined />
                        </a>
                    </Tooltip>
                    <Tooltip placement="top" title="Xoá">
                        <a onClick={() => showDeleteModal(record["id"])}>
                            <DeleteOutlined />
                        </a>
                    </Tooltip>
                </Space>
            ),
            width: "15%",
            fixed: "right"
        },
    ]

const getDataForTableFunc = (values) => {
    return apiSearch({
        url: "http://localhost:3000/api/costs/list",
        queryParams: values
    })
}

const CostTable = ({ setOpen, setInputData }) => {
    const showUpdateModal = (record) => {
        setInputData({ id: record["id"] });
        setOpen(true);
    }

    const showDeleteModal = (record) => {
        setInputData({ id: record["id"], isDelete: true });
        setOpen(true);
    }

    const handlePreProcess = (values) => (values && values["results"]) ? values["results"] : [];

    return (
        <CustomTable
            columnsTable={columnsTable({ showUpdateModal, showDeleteModal })}
            getDataForTableFunc={getDataForTableFunc}
            handlePreProcess={handlePreProcess}
        />
    )
}

export default CostTable;