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
        url: "http://localhost:3000/api/costs/detail",
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

const handlePreProcess = (values) => {
    return values;
}   

const handlePostProcess = (values) => {
    return values;
}

const contentConfirm = (record) => (
    <Space size={"small "} direction="vertical">
        <p>ID: {record["id"]}</p>
        <p>Tỉnh: {record["province"]}</p>
        <p>Điểm đến: {record["arrival"]}</p>
    </Space>
)

const CostForm = ({ id, open, setOpen }) => {
    return (
        <FormInModal
            id={id}
            getDetailFunc={getDetailFunc}
            createDataFunc={createDataFunc}
            updateDataFunc={updateDataFunc}
            handlePreProcess={handlePreProcess}
            handlePostProcess={handlePostProcess}
            open={open}
            setOpen={setOpen}
        >
            {formItems(id)}
        </FormInModal>
    )
}

export default CostForm;

const onClickDeleteButton = (record) =>
    showDeleteConfirms({
        id: record["id"],
        record,
        contentConfirm,
        deleteDataFunc
    })

export { onClickDeleteButton };