import React, { useEffect, useState } from "react";
import { Space, Badge, Form, Input, Select, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import { apiSearch, handleActionCallback } from "../Common/Utils";

const loadFunction = (queryParams) => {
    return apiSearch({
        url: `http://localhost:3000/api/costs/list`,
        queryParams
    });
}

const getFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/costs/detail`,
        queryParams: { id }
    });
}

const createFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/costs/add`,
        method: "POST",
        bodyParams: values
    });
}

const updateFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/costs/update`,
        method: "POST",
        queryParams: { id: values.id },
        bodyParams: values
    });
}

const deleteFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/costs/delete`,
        queryParams: { id }
    });
}

const Cost = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [initUpdateModalData, setInitUpdateModalData] = useState({});

    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const [formCreate] = Form.useForm();
    const [formUpdate] = Form.useForm();

    const showUpdateModal = (record) => {
        console.log(record)
        formUpdate.setFieldsValue(record);
        setInitUpdateModalData(record);
        setIsUpdateModalVisible(true);
    }

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "5%",
        },
        {
            title: "Tỉnh",
            dataIndex: "province",
            key: "province",
            width: "20%",
        },
        {
            title: "Tuyến đường",
            dataIndex: "arrival",
            key: "arrival",
            width: "30%",
        },
        {
            title: "Báo giá",
            dataIndex: "pricing",
            key: "pricing",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
            width: "20%",
        },
        {
            title: "Chi phí",
            dataIndex: "tolls",
            key: "tolls",
            render: (value => `${new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(value)}`),
            width: "20%",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip placement="topLeft" title="Cập nhật">
                        <a onClick={() => showUpdateModal(record)}>
                            <EditOutlined />
                        </a>
                    </Tooltip>
                    <Tooltip placement="top" title="Xoá">
                        <a onClick={() => showDeleteConfirm({
                            object: "chi phí",
                            data: record,
                            labelInKeys: [{
                                label: "Mã chi phí",
                                key: "id"
                            }],
                            onDeleteSubmit: onDeleteSubmit
                        })}>
                            <DeleteOutlined />
                        </a>
                    </Tooltip>
                </Space>
            ),
            width: "10%",
        },
    ]

    const onCreateSubmit = (values) => {
        handleActionCallback(createFunction, values)
            .then(() => {
                setIsCreateModalVisible(false);
                formCreate.resetFields();
                triggerReload();
            }).catch(e => { console.log(e) })
    };

    const onUpdateSubmit = (values) => {
        handleActionCallback(updateFunction, values)
            .then(() => {
                setIsUpdateModalVisible(false);
                formUpdate.resetFields();
                triggerReload();
            }).catch(e => { console.log(e) })
    };

    const onDeleteSubmit = (id) => {
        handleActionCallback(deleteFunction, id)
            .then(() => {
                triggerReload();
            }).catch(e => { console.log(e) })
    };

    const createFormList = (
        <Form
            form={formCreate}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            onFinish={onCreateSubmit}
            autoComplete="off"
        >
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
                <Input placeholder="Vui lòng nhập tên tỉnh"/>
            </Form.Item>
            <Form.Item
                label="Tuyến đường"
                name="arrival"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tuyến đường!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tuyến đường"/>
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
                <Input placeholder="Vui lòng nhập báo giá"/>
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
                <Input placeholder="Vui lòng nhập chi phí"/>
            </Form.Item>
        </Form>
    );
    const updateFormList = (
        <Form
            form={formUpdate}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            onFinish={onUpdateSubmit}
            autoComplete="off"
        >
            <Form.Item
                label="Mã chi phí"
                name="id"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input disabled />
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
                <Input placeholder="Vui lòng nhập tên tỉnh"/>
            </Form.Item>
            <Form.Item
                label="Tuyến đường"
                name="arrival"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tuyến đường!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tuyến đường"/>
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
                <Input placeholder="Vui lòng nhập báo giá"/>
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
                <Input placeholder="Vui lòng nhập chi phí"/>
            </Form.Item>
        </Form>
    );

    return (
        <>
            <CreateModal
                object="chi phí"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {createFormList}
            </CreateModal>
            <UpdateModal
                object="chi phí"
                isModalVisible={isUpdateModalVisible}
                setIsModalVisible={setIsUpdateModalVisible}
                form={formUpdate}
            >
                {updateFormList}
            </UpdateModal>
            <LoadTable
                columns={columns}
                loadFunction={loadFunction}
                reload={reload}
            />
        </>
    )
}

export default Cost;
