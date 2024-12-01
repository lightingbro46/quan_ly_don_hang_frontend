import { useState } from "react";
import { Form, Select, Input, InputNumber, Space } from "antd";

import FormInModal, { showDeleteConfirms } from "../Common/FormInModal";
import { apiSearch } from "../Common/Utils";

const formItems = (id) => (
    <>
        <Form.Item
            label="ID"
            name="id"
            rules={[
                {
                    required: id ? true : false,
                    message: "Vui lòng nhập mã chi phí!",
                },
            ]}
            hidden={!id}
        >
            <Input readOnly />
        </Form.Item>
        <Form.Item
            label="Tỉnh"
            name="province"
            rules={[
                {
                    required: true,
                    message: "Vui lòng nhập tên tỉnh!",
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Điển đến"
            name="arrival"
            rules={[
                {
                    required: true,
                    message: "Vui lòng nhập điểm đến!",
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Báo giá"
            name="pricing"
            rules={[
                {
                    required: true,
                    message: "Vui lòng nhập báo giá!",
                },
            ]}
        >
            <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                addonAfter="₫"
            />
        </Form.Item>
        <Form.Item
            label="Chi phí"
            name="tolls"
            rules={[
                {
                    required: true,
                    message: "Vui lòng nhập chi phí!",
                },
            ]}
        >
            <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                addonAfter="₫"
            />
        </Form.Item>
    </>
)

const getDetailFunc = (id) =>
    apiSearch({
        url: "https://localhost:3000/api/costs/detail",
        queryParams: { id }
    })

const createDataFunc = (values) =>
    apiSearch({
        url: "http://localhost:3000/api/costs/add",
        method: "POST",
        bodyParams: values
    })


const updateDataFunc = (values) =>
    apiSearch({
        url: "http://localhost:3000/api/costs/update",
        method: "POST",
        queryParams: { id: values.id },
        bodyParams: values
    })

const deleteDataFunc = (id) =>
    apiSearch({
        url: "http://localhost:3000/api/costs/delete",
        queryParams: { id },
    })

const contentConfirm = (record) => (
    <Space size={"middle"} direction="vertical">
        ID: {record["id"]}
        Tỉnh: {record["province"]}
        Điểm đến: {record["arrival"]}
    </Space>
)

const CostForm = ({ id, record, isDelete = false, open, setOpen }) => {
    return (
        <>
            {!isDelete ?
                (
                    <FormInModal
                        id={id}
                        getDetailFunc={getDetailFunc}
                        createDataFunc={createDataFunc}
                        updateDataFunc={updateDataFunc}
                        open={open}
                        setOpen={setOpen}
                    >
                        {formItems(id)}
                    </FormInModal>
                )
                : (
                    showDeleteConfirms({
                        id,
                        record,
                        contentConfirm,
                        deleteDataFunc,
                    })
                )
            }
        </>
    )
}

export default CostForm;