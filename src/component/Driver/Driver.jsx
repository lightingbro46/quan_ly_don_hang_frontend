import React, { useEffect, useState } from "react";
import { Space, Badge, Flex, Button, Form, Input, Select, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";

const loadFunction = (query) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/api/drivers/list?${query}`)
            .then(res => {
                if (res.ok)
                    return res.json();
                else throw new Error("Invalid response");
            })
            .then(res => resolve(res))
            .catch(e => reject(e));
    })
}

const getFunction = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/api/drivers/detail?id=${id}`)
            .then(res => {
                if (res.ok)
                    return res.json();
                else throw new Error("Invalid response");
            })
            .then(res => resolve(res))
            .catch(e => reject(e));
    })
}

const createFunction = (values) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/api/drivers/add`, {
            method: "POST",
            body: JSON.stringify(values)
        })
            .then(res => {
                if (res.ok)
                    return res.json();
                else throw new Error("Invalid response");
            })
            .then(res => resolve(res))
            .catch(e => reject(e));
    })
}

const updateFunction = (values) => {
    return new Promise((resolve, reject) => {
        const id = values.id;
        fetch(`http://localhost:3000/api/drivers/update?id=${id}`, {
            method: "POST",
            body: JSON.stringify(values)
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Invalid response")
                }

            })
            .then(res => resolve(res))
            .catch(e => reject(e));
    })
}

const deleteFunction = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/api/drivers/delete?id=${id}`)
            .then(res => {
                if (res.ok)
                    return resolve()
                else
                    throw new Error("Invalid response");
            })
            .catch(e => reject(e));
    })
}

const Driver = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [initUpdateModalData, setInitUpdateModalData] = useState({});

    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const [formCreate] = Form.useForm();
    const [formUpdate] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

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
            title: "Tên tài xế",
            dataIndex: "name",
            key: "name",
            width: "15%",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            render: (gender) => `${gender == 1 ? "Nam" : "Nữ"}`,
            width: "10%",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: "20%",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Space size="middle">
                    {(status == 1) && (
                        <>
                            <Badge dot status="success" title="Đang làm việc" />
                            <span>Đang làm việc</span>
                        </>
                    )}
                    {(status == 2) && (
                        <>
                            <Badge dot status="error" />
                            <span>Nghỉ việc</span>
                        </>
                    )}
                </Space>
            ),
            width: "20%",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showUpdateModal(record)}>
                        <EditOutlined />
                    </a>
                    <a onClick={() => showDeleteConfirm({
                        object: "tài xế",
                        data: record,
                        labelKeys: [{
                            label: "Mã tài xế",
                            key: "id"
                        }, {
                            label: "Tên tài xế",
                            key: "name"
                        }],
                        onDeleteSubmit: onDeleteSubmit
                    })}>
                        <DeleteOutlined />
                    </a>
                </Space>
            ),
            width: "10%",
        },
    ]

    const onCreateSubmit = (values) => {
        console.log("Success:", values);
        messageApi.open({
            key,
            type: 'loading',
            content: `Thêm mới...`,
        });
        createFunction(values)
            .then((res) => {
                messageApi.open({
                    key,
                    type: 'success',
                    content: `Thêm mới thành công!`,
                });
                setIsCreateModalVisible(false);
                formCreate.resetFields();
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                messageApi.open({
                    key,
                    type: 'error',
                    content: `Thêm mới thất bại`,
                });
            })
    };

    const onUpdateSubmit = (values) => {
        console.log("Success:", values);
        messageApi.open({
            key,
            type: 'loading',
            content: `Cập nhật...`,
        });
        updateFunction(values)
            .then((res) => {
                messageApi.open({
                    key,
                    type: 'success',
                    content: `Cập nhật thành công!`,
                });
                formUpdate.resetFields();
                setIsUpdateModalVisible(false);
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                messageApi.open({
                    key,
                    type: 'error',
                    content: `Cập nhật thất bại`,
                });
            })
    };

    const onDeleteSubmit = (id) => {
        console.log("Success:", id);
        messageApi.open({
            key,
            type: 'loading',
            content: `Xoá...`,
        });
        deleteFunction(id)
            .then((res) => {
                messageApi.open({
                    key,
                    type: 'success',
                    content: `Xoá thành công!`,
                });
                setIsDeleteModalVisible(false);
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                messageApi.open({
                    key,
                    type: 'error',
                    content: `Xoá thất bại`,
                });
            })
    };

    const CreateFormList = (
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
                label="Tên tài xế"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Giới tính"
                name="gender"

                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn giới tính!",
                    },
                ]}
            >
                <Select
                    options={[
                        { value: 1, label: "Nam" },
                        { value: 2, label: "Nữ" },
                    ]}
                    placeholder="Vui lòng chọn giới tính"
                />
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>)

    const UpdateFormList = (
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
                label="Mã tài xế"
                name="id"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input disabled={true} />
            </Form.Item>
            <Form.Item
                label="Tên tài xế"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Giới tính"
                name="gender"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn giới tính!",
                    },
                ]}
            >
                <Select
                    options={[
                        { value: 1, label: "Nam" },
                        { value: 2, label: "Nữ" },
                    ]}
                    placeholder="Vui lòng chọn giới tính"
                />
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn trạng thái!",
                    },
                ]}
            >
                <Select
                    options={[
                        { value: 1, label: "Đang làm việc" },
                        { value: 2, label: "Nghỉ việc" },
                    ]}
                    placeholder="Vui lòng chọn trạng thái"
                />
            </Form.Item>
        </Form>
    )
    return (
        <>
            {contextHolder}
            <CreateModal
                object="tài xế"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {CreateFormList}
            </CreateModal>
            <UpdateModal
                object="tài xế"
                isModalVisible={isUpdateModalVisible}
                setIsModalVisible={setIsUpdateModalVisible}
                form={formUpdate}
            >
                {UpdateFormList}
            </UpdateModal>
            <LoadTable
                columns={columns}
                loadFunction={loadFunction}
                reload={reload}
            />
        </>
    )
}

export default Driver;