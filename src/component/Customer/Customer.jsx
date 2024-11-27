import { useState } from "react";
import { Space, Form, Input, Tooltip, Flex, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import { apiSearch, handleActionCallback } from "../Common/Utils";

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
        queryParams: { id },
    });
}

const Customer = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [inputModalData, setInputModalData] = useState({});

    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const [formCreate] = Form.useForm();
    const [formUpdate] = Form.useForm();

    const showCreateModal = () => {
        setIsCreateModalVisible(true);
    }

    const showUpdateModal = (record) => {
        console.log(record)
        formUpdate.setFieldsValue(record);
        setInputModalData(record);
        setIsUpdateModalVisible(true);
    }

    const onCreateSubmit = (values) => {
        handleActionCallback(createFunction, values)
            .then(() => {
                setIsCreateModalVisible(false);
                formCreate.resetFields();
                triggerReload();
            }).catch(e => { })
    };

    const onUpdateSubmit = (values) => {
        handleActionCallback(updateFunction, values)
            .then(() => {
                setIsUpdateModalVisible(false);
                formUpdate.resetFields();
                triggerReload();
            }).catch(e => { })
    };

    const onDeleteSubmit = (id) => {
        handleActionCallback(deleteFunction, id)
            .then(() => {
                triggerReload();
            }).catch(e => { })
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "5%",
            fixed: 'left',
        },
        {
            title: "Tên khách hàng",
            dataIndex: "name",
            key: "name",
            width: "15%",
            fixed: 'left',
        },
        {
            title: "CCCD",
            dataIndex: "identification",
            key: "identification",
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
            dataIndex: "phone_number",
            key: "phone_number",
            width: "10%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "15%",
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
                            object: "khách hàng",
                            data: record,
                            labelInKeys: [{
                                label: "ID",
                                key: "id"
                            }, {
                                label: "Tên khách hàng",
                                key: "name"
                            }],
                            onDeleteSubmit: onDeleteSubmit
                        })}>
                            <DeleteOutlined />
                        </a>
                    </Tooltip>
                </Space>
            ),
            width: "15%",
            align: 'center',
            fixed: 'right',
        },
    ]

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
                        message: "Vui lòng nhập tên khách hàng!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tên khách hàng" />
            </Form.Item>
            <Form.Item
                label="Số CCCD"
                name="identification"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập số CCCD!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập số CCCD" />
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
                <Input placeholder="Vui lòng nhập tên công ty" />
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
                <Input placeholder="Vui lòng nhập mã số thuế" />
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
                <Input placeholder="Vui lòng nhập địa chỉ" />
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="phone_number"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập số điện thoại" />
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
                <Input placeholder="Vui lòng nhập email" />
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
                label="ID"
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
                label="Tên khách hàng"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên khách hàng!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tên khách hàng" />
            </Form.Item>
            <Form.Item
                label="Số CCCD"
                name="identification"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập số CCCD!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập số CCCD" />
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
                <Input placeholder="Vui lòng nhập tên công ty" />
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
                <Input placeholder="Vui lòng nhập mã số thuế" />
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
                <Input placeholder="Vui lòng nhập địa chỉ" />
            </Form.Item>
            <Form.Item
                label="Số điện thoại"
                name="phone_number"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập số điện thoại" />
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
                <Input placeholder="Vui lòng nhập email" />
            </Form.Item>
        </Form>
    )
    return (
        <>
            <Flex justify="flex-end" align="center">
                <Button
                    style={{
                        marginBottom: "16px",
                    }}
                    type="default"
                    onClick={() => showCreateModal()}
                >
                    <PlusOutlined /><span>Thêm mới</span>
                </Button>
            </Flex>
            <CreateModal
                name="khách hàng"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {createFormList}
            </CreateModal>
            <UpdateModal
                name="khách hàng"
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