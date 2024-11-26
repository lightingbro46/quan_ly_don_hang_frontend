import { useState } from "react";
import { Space, Form, Input, Select, Tooltip, Tag, DatePicker, Checkbox } from "antd";
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
import { user_data } from "../mock";
const loadFunction = (queryParams) => {
    return new Promise(resolve => resolve(user_data))
    return apiSearch({
        url: `http://localhost:3000/api/users/list`,
        queryParams
    });
}

const getFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/users/detail`,
        queryParams: { id }
    });
}

const createFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/users/add`,
        method: "POST",
        bodyParams: values
    });
}

const updateFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/users/update`,
        method: "POST",
        queryParams: { id: values.id },
        bodyParams: values
    });
}

const deleteFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/users/delete`,
        queryParams: { id }
    });
}

const User = () => {
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
            title: "Mã nhân viên",
            dataIndex: "id",
            key: "id",
            width: "5%",
        },
        {
            title: "Tên nhân viên",
            dataIndex: "fullname",
            key: "fullname",
            width: "15%",
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            key: "birthday",
            width: "15%",
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "gender",
            render: (gender) => `${gender == 1 ? "Nam" : "Nữ"}`,
            width: "10%",
        },
        {
            title: "Chức vụ",
            dataIndex: "position",
            key: "position",
            width: "15%",
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
            width: "20%",
        },
        {
            title: "Ngày vào làm",
            dataIndex: "start_date",
            key: "start_date",
            width: "15%",
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        },
        {
            title: "Ngày nghỉ việc",
            dataIndex: "end_date",
            key: "end_date",
            width: "15%",
            render: (text) => text ? dayjs(text).format('DD/MM/YYYY') : "",
        },
        {
            title: "Quyền admin",
            dataIndex: "is_admin",
            key: "is_admin",
            render: (status) => (
                <Space size="small">
                    {(status == 1) && (
                        <Tag icon={<CheckCircleOutlined />} color="success" />
                    )}
                </Space>
            ),
            width: "15%",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Space size="small">
                    {(status == 1) && (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Đang làm việc
                        </Tag>
                    )}
                    {(status == 2) && (
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
                            object: "nhân viên",
                            data: record,
                            labelInKeys: [{
                                label: "Mã nhân viên",
                                key: "id"
                            }, {
                                label: "Tên nhân viên",
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
                label="Tên nhân viên"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên nhân viên!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tên nhân viên" />
            </Form.Item>
            <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn ngày sinh!",
                    },
                ]}
            >
                <DatePicker format="DD/MM/YYYY" placeholder="Vui lòng chọn ngày sinh" />
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
                label="Chức vụ"
                name="position"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập chức vụ!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập chức vụ" />
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
                <Input placeholder="Vui lòng nhập số điện thoại" />
            </Form.Item>
            <Form.Item
                label="Ngày vào làm"
                name="start_date"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn ngày vào làm!",
                    },
                ]}
            >
                <DatePicker format="DD/MM/YYYY" placeholder="Vui lòng chọn ngày vào làm" />
            </Form.Item>
            <Form.Item
                label={null}
                name="is_admin"
            >
                <Checkbox defaultChecked={false}>Quyền admin</Checkbox>
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
                label="Mã nhân viên"
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
                label="Tên nhân viên"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên nhân viên!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tên nhân viên" />
            </Form.Item>
            <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn ngày sinh!",
                    },
                ]}
            >
                <DatePicker format="DD/MM/YYYY" placeholder="Vui lòng chọn ngày sinh" />
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
                label="Chức vụ"
                name="position"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập chức vụ!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập chức vụ" />
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
                <Input placeholder="Vui lòng nhập số điện thoại" />
            </Form.Item>
            <Form.Item
                label="Ngày vào làm"
                name="start_date"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn ngày vào làm!",
                    },
                ]}
            >
                <DatePicker format="DD/MM/YYYY" placeholder="Vui lòng chọn ngày vào làm" />
            </Form.Item>
            <Form.Item
                label={null}
                name="is_admin"
            >
                <Checkbox defaultChecked={false}>Quyền admin</Checkbox>
            </Form.Item>
        </Form>
    )
    return (
        <>
            <CreateModal
                name="nhân viên"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {CreateFormList}
            </CreateModal>
            <UpdateModal
                name="nhân viên"
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

export default User;
