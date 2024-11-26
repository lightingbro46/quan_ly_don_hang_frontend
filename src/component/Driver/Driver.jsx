import { useState } from "react";
import { Space, Form, Input, Select, Tooltip, DatePicker, Tag } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons"
import dayjs from "dayjs";

import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import { apiSearch, handleActionCallback } from "../Common/Utils";
import { driver_data } from "../mock";

const loadFunction = (queryParams) => {
    return new Promise(resolve => resolve(driver_data))
    return apiSearch({
        url: `http://localhost:3000/api/drivers/list`,
        queryParams
    });
}

const getFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/drivers/detail`,
        queryParams: { id }
    });
}

const createFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/drivers/add`,
        method: "POST",
        bodyParams: values
    });
}

const updateFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/drivers/update`,
        method: "POST",
        queryParams: { id: values.id },
        bodyParams: values
    });
}

const deleteFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/drivers/delete`,
        queryParams: { id }
    });
}

const Driver = () => {
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
            title: "Tên tài xế",
            dataIndex: "name",
            key: "name",
            width: "15%",
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            key: "birthday",
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
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
            dataIndex: "phone_number",
            key: "phone_number",
            width: "20%",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Space size="small">
                    {(status == 1) && (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Sẵn sàng
                        </Tag>
                    )}
                    {(status == 2) && (
                        <Tag icon={<SyncOutlined spin />} color="processing">
                            Đang làm việc
                        </Tag>
                    )}
                    {(status == 3) && (
                        <Tag icon={<MinusCircleOutlined />} color="error">
                            Nghỉ việc
                        </Tag>
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
                    <Tooltip placement="topLeft" title="Cập nhật">
                        <a onClick={() => showUpdateModal(record)}>
                            <EditOutlined />
                        </a>
                    </Tooltip>
                    <Tooltip placement="top" title="Xoá">
                        <a onClick={() => showDeleteConfirm({
                            object: "tài xế",
                            data: record,
                            labelInKeys: [{
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
                        message: "Vui lòng nhập tên tài xế!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tên tài xế" />
            </Form.Item>
            <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn ngày thàng năm sinh!",
                    },
                ]}
            >
                <DatePicker format="DD/MM/YYYY" placeholder="Vui lòng chọn ngày thàng năm sinh" />
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
                name="phone_number"
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
                <Input disabled />
            </Form.Item>
            <Form.Item
                label="Tên tài xế"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên tài xế!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn ngày thàng năm sinh!",
                    },
                ]}
            >
                <DatePicker format="DD/MM/YYYY" placeholder="Vui lòng chọn ngày thàng năm sinh" />
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
                name="phone_number"
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
                        { value: 1, label: "Sẵn sàng" },
                        { value: 2, label: "Đang làm việc" },
                        { value: 3, label: "Nghỉ việc" },
                    ]}
                    placeholder="Vui lòng chọn trạng thái"
                />
            </Form.Item>
        </Form>
    )
    return (
        <>
            <CreateModal
                name="tài xế"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {CreateFormList}
            </CreateModal>
            <UpdateModal
                name="tài xế"
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