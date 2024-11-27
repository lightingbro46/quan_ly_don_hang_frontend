import { useState } from "react";
import { Space, Form, Input, Select, Tooltip, Tag, DatePicker, Checkbox, Flex, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckCircleOutlined } from "@ant-design/icons"
import dayjs from "dayjs";

import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import { apiSearch, handleActionCallback } from "../Common/Utils";

const loadFunction = (queryParams) => {
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

const userStatusOptions = [
    {
        value: 1,
        label: "Đang làm việc"
    },
    {
        value: 2,
        label: "Đã nghỉ việc"
    }
]
const User = () => {
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
        record["birthday"] = dayjs(record["birthday"]);
        record["start_date"] = dayjs(record["start_date"]);
        if (record["end_date"]) {
            record["end_date"] = dayjs(record["end_date"]);
        }
        formUpdate.setFieldsValue(record);
        setInputModalData(record);
        setIsUpdateModalVisible(true);
    }

    const onUpdateChange = (change) => {
        console.log(change)
        setInputModalData(preValues => {
            let current = { ...preValues, ...change };
            if (current["status"] != userStatusOptions[1]["value"]) {
                current["end_date"] = null;
                formUpdate.setFieldValue("end_date", null);
            }
            return current;
        })
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
                setInputModalData({});
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
            title: "Tên nhân viên",
            dataIndex: "fullname",
            key: "fullname",
            width: "15%",
            fixed: 'left',
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            key: "birthday",
            width: "10%",
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
            width: "10%",
        },
        {
            title: "Admin",
            dataIndex: "is_admin",
            key: "is_admin",
            render: (status) => ((status == 1) && (<CheckCircleOutlined style={{ fontSize: "16px" }} />)),
            width: "5%",
            align: 'center'
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status, record) => (
                <>
                    {(status == userStatusOptions[0]["value"]) && (
                        <Tooltip placement="top" title={`Từ ngày ${dayjs(record["start_date"]).format('DD/MM/YYYY')}`}>
                            <Tag color="success">
                                {userStatusOptions[0]["label"]}
                            </Tag>
                        </Tooltip>
                    )}
                    {(status == userStatusOptions[1]["value"]) && (
                        <Tooltip placement="top" title={`Từ ngày ${dayjs(record["end_date"]).format('DD/MM/YYYY')}`}>
                            <Tag color="error">
                                {userStatusOptions[1]["label"]}
                            </Tag>
                        </Tooltip>
                    )}
                </>
            ),
            width: "5%",
            align: 'center'
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
                                label: "ID",
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
            width: "15%",
            align: 'center',
            fixed: 'right',
        },
    ]

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
                name="fullname"
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
                valuePropName="checked"
            >
                <Checkbox defaultChecked={false}>Quyền admin</Checkbox>
            </Form.Item>
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tài khoản!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tài khoản" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập mật khẩu!",
                    },
                ]}
            >
                <Input.Password placeholder="Vui lòng nhập mật khẩu" />
            </Form.Item>
        </Form>
    )

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
            onValuesChange={onUpdateChange}
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
                label="Tên nhân viên"
                name="fullname"
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
                label="Ngày nghỉ việc"
                name="end_date"
                rules={[
                    {
                        required: inputModalData["status"] == userStatusOptions[1]["value"],
                        message: "Vui lòng chọn ngày nghỉ việc!",
                    },
                ]}
                hidden={inputModalData["status"] != userStatusOptions[1]["value"]}
            >
                <DatePicker format="DD/MM/YYYY" placeholder="Vui lòng chọn ngày nghỉ việc" />
            </Form.Item>
            <Form.Item
                label={null}
                name="is_admin"
                valuePropName="checked"
            >
                <Checkbox>Quyền admin</Checkbox>
            </Form.Item>
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tài khoản!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tài khoản" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập mật khẩu!",
                    },
                ]}
            >
                <Input.Password placeholder="Vui lòng nhập mật khẩu" />
            </Form.Item>
            <Form.Item
                label="Trạng thái"
                name="status"
            >
                <Select
                    options={userStatusOptions}
                    placeholder="Vui lòng chọn trạng thái"
                />
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
