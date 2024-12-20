import { useState } from "react";
import { Space, Form, Input, InputNumber, Tooltip, Flex, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import { apiSearch, handleActionCallback } from "../Common/Utils";

const loadDataForTableFunction = (queryParams) => {
    return apiSearch({
        url: `http://localhost:3000/api/costs/list`,
        queryParams
    });
}

const getDetailFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/costs/detail`,
        queryParams: { id }
    });
}

const createDataFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/costs/add`,
        method: "POST",
        bodyParams: values
    });
}

const updateDataFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/costs/update`,
        method: "POST",
        queryParams: { id: values.id },
        bodyParams: values
    });
}

const deleteDataFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/costs/delete`,
        queryParams: { id }
    });
}

const Cost = () => {
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
        handleActionCallback(createDataFunction, values)
            .then(() => {
                setIsCreateModalVisible(false);
                formCreate.resetFields();
                triggerReload();
            }).catch(e => { })
    };

    const onUpdateSubmit = (values) => {
        handleActionCallback(updateDataFunction, values)
            .then(() => {
                setInputModalData({})
                setIsUpdateModalVisible(false);
                formUpdate.resetFields();
                triggerReload();
            }).catch(e => { })
    };

    const onDeleteSubmit = (id) => {
        handleActionCallback(deleteDataFunction, id)
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
                        <a onClick={() => showUpdateModal(record)}>
                            <EditOutlined />
                        </a>
                    </Tooltip>
                    <Tooltip placement="top" title="Xoá">
                        <a onClick={() => showDeleteConfirm({
                            object: "chi phí",
                            data: record,
                            labelInKeys: [{
                                label: "ID",
                                key: "id"
                            }, {
                                label: "Tỉnh",
                                key: "province"
                            }, {
                                label: "Tuyến đường",
                                key: "arrival"
                            }],
                            onDeleteSubmit: onDeleteSubmit
                        })}>
                            <DeleteOutlined />
                        </a>
                    </Tooltip>
                </Space>
            ),
            width: "15%",
            fixed: "right"
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
                label="Tỉnh"
                name="province"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên tỉnh!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tên tỉnh" />
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
                <Input placeholder="Vui lòng nhập tuyến đường" />
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
                    placeholder="Vui lòng nhập báo giá" />
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
                    placeholder="Vui lòng nhập chi phí" />
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
                label="ID"
                name="id"
                rules={[
                    {
                        required: true,
                    },
                ]}
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
                <Input placeholder="Vui lòng nhập tên tỉnh" />
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
                <Input placeholder="Vui lòng nhập tuyến đường" />
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
                    placeholder="Vui lòng nhập báo giá" />
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
                    placeholder="Vui lòng nhập chi phí" />
            </Form.Item>
        </Form>
    );

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
                name="chi phí"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {createFormList}
            </CreateModal>
            <UpdateModal
                name="chi phí"
                isModalVisible={isUpdateModalVisible}
                setIsModalVisible={setIsUpdateModalVisible}
                form={formUpdate}
            >
                {updateFormList}
            </UpdateModal>
            <LoadTable
                columns={columns}
                loadDataForTableFunction={loadDataForTableFunction}
                reload={reload}
            />
        </>
    )
}

export default Cost;
