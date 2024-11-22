import React, { useState } from "react";
import { Space, Form, Input, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import { apiSearch } from "../Common/Utils";

const loadFunction = (queryParams) => {
    return apiSearch({
        url: `http://localhost:3000/api/customers/list`,
        queryParams
    });
}

const getFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/customers/detail`,
        queryParams: { id }
    });
}

const createFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/customers/add`,
        method: "POST",
        bodyParams: values
    });
}

const updateFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/customers/update`,
        method: "POST",
        queryParams: { id: values.id },
        bodyParams: values
    });
}

const deleteFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/customers/delete`,
        queryParams: { id: values.id },
    });
}

const Customer = () => {
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
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
            width: "15%",
        },
        {
            title: "Tên công ty",
            dataIndex: "company",
            key: "company",
            width: "15%",
        },
        {
            title: "Mã số thuế",
            dataIndex: "tax",
            key: "tax",
            width: "10%",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            width: "15%",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: "10%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
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
                        object: "khách hàng",
                        data: record,
                        labelKeys: [{
                            label: "Mã khách hàng",
                            key: "id"
                        }, {
                            label: "Tên khách hàng",
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
        message.loading(`Thêm mới...`);
        createFunction(values)
            .then((res) => {
                message.success(`Thêm mới thành công!`);
                setIsCreateModalVisible(false);
                formCreate.resetFields();
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                message.error(`Thêm mới thất bại`);
            })
    };

    const onUpdateSubmit = (values) => {
        console.log("Success:", values);
        message.loading(`Cập nhật...`);
        updateFunction(values)
            .then((res) => {
                message.success(`Cập nhật thành công!`);
                formUpdate.resetFields();
                setIsUpdateModalVisible(false);
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                message.error(`Cập nhật thất bại`);
            })
    };

    const onDeleteSubmit = (id) => {
        console.log("Success:", id);
        message.loading(`Xoá...`);
        deleteFunction(id)
            .then((res) => {
                message.success(`Xoá thành công!`);
                setIsDeleteModalVisible(false);
                triggerReload();
            })
            .catch(e => {
                console.log(e);
                message.error(`Xoá thất bại`);
            })
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
                label="Tên khách hàng"
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
                label="Tên công ty"
                name="company"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên công ty!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Mã số thuế"
                name="tax"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập mã số thuế!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập địa chỉ!",
                    },
                ]}
            >
                <Input />
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
                label="Email"
                name="email"
                rules={[
                    {
                        type: "email",
                    }
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    )

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
                label="Mã khách hàng"
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
                label="Tên khách hàng"
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
                label="Tên công ty"
                name="company"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên công ty!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Mã số thuế"
                name="tax"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập mã số thuế!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập địa chỉ!",
                    },
                ]}
            >
                <Input />
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
                label="Email"
                name="email"
                rules={[
                    {
                        type: "email",
                    }
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
    return (
        <>
            <CreateModal
                object="khách hàng"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {createFormList}
            </CreateModal>
            <UpdateModal
                object="khách hàng"
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

export default Customer;