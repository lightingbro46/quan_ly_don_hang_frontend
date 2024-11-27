import { useState } from "react";
import { Space, Form, Input, Select, Tooltip, DatePicker, Tag, Button, Flex } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, SolutionOutlined } from "@ant-design/icons"
import dayjs from "dayjs";

import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import TimelineModal from "../Common/TimelineDriverModal";
import { apiSearch, handleActionCallback } from "../Common/Utils";

const loadFunction = (queryParams) => {
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

const driverStatusOptions = [
    {
        value: 1,
        label: "Sẵn sàng"
    },
    {
        value: 2,
        label: "Đang vận chuyển"
    },
    {
        value: 3,
        label: "Đã nghỉ việc"
    }
]

const Driver = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isTimelineModalVisible, setIsTimelineModalVisible] = useState(false);
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
        formUpdate.setFieldsValue(record);
        setInputModalData(record);
        setIsUpdateModalVisible(true);
    }

    const showTimelineModal = (record) => {
        console.log(record)
        record["birthday"] = dayjs(record["birthday"]);
        setInputModalData(record);
        setIsTimelineModalVisible(true);
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
                setInputModalData({})
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

    const onTimelineClose = (id) => {
        setInputModalData({});
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
            title: "Tên tài xế",
            dataIndex: "name",
            key: "name",
            width: "15%",
            fixed: 'left',
        },
        {
            title: "Ngày sinh",
            dataIndex: "birthday",
            key: "birthday",
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
            width: "10%",
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
                <>
                    {(status == driverStatusOptions[0]["value"]) && (
                        <Tag color="success">
                            {driverStatusOptions[0]["label"]}
                        </Tag>
                    )}
                    {(status == driverStatusOptions[1]["value"]) && (
                        <Tag color="processing">
                            {driverStatusOptions[1]["label"]}
                        </Tag>
                    )}
                    {(status == driverStatusOptions[2]["value"]) && (
                        <Tag color="error">
                            {driverStatusOptions[2]["label"]}
                        </Tag>
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
                    <Tooltip placement="topRight" title="Lịch trình hoạt động">
                        <a onClick={() => showTimelineModal(record)}>
                            <SolutionOutlined />
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
                    options={driverStatusOptions}
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
            <TimelineModal
                isModalVisible={isTimelineModalVisible}
                setIsModalVisible={setIsTimelineModalVisible}
                data={inputModalData}
                onTimelineClose={onTimelineClose}
            />
            <LoadTable
                columns={columns}
                loadFunction={loadFunction}
                reload={reload}
            />
        </>
    )
}

export default Driver;