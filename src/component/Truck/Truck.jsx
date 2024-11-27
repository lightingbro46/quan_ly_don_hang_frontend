import { useEffect, useState } from "react";
import { Space, Form, Input, Select, Tooltip, Tag, Flex, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, TruckOutlined } from "@ant-design/icons"

import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import TimelineModal from "../Common/TimelineTruckModal";
import { apiSearch, handleActionCallback } from "../Common/Utils";

const loadFunction = (queryParams) => {
    return apiSearch({
        url: `http://localhost:3000/api/trucks/list`,
        queryParams
    });
}

const getFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/trucks/detail`,
        queryParams: { id }
    });
}

const createFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/trucks/add`,
        method: "POST",
        bodyParams: values
    });
}

const updateFunction = (values) => {
    return apiSearch({
        url: `http://localhost:3000/api/trucks/update`,
        method: "POST",
        queryParams: { id: values.id },
        bodyParams: values
    });
}

const deleteFunction = (id) => {
    return apiSearch({
        url: `http://localhost:3000/api/trucks/delete`,
        queryParams: { id }
    });
}

const loadOptionTruckCatFunction = (queryParams) => {
    return apiSearch({
        url: `http://localhost:3000/api/truck_cats/list`,
        queryParams
    });
}

const truckStatusOptions = [
    { value: 1, label: "Sẵn sàng" },
    { value: 2, label: "Đang vận chuyển" },
    { value: 3, label: "Bảo dưỡng" },
]

const Truck = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isTimelineModalVisible, setIsTimelineModalVisible] = useState(false);
    const [inputModalData, setInputModalData] = useState({});
    const [truckCatOptions, setTruckCatOptions] = useState([]);

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

    const showTimelineModal = (record) => {
        console.log(record)
        setInputModalData(record);
        setIsTimelineModalVisible(true);
    }

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
                setInputModalData({});
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

    const onTimelineClose = () => {
        setInputModalData({})
    }

    useEffect(() => {
        loadOptionTruckCatFunction()
            .then(res => {
                setTruckCatOptions(res.results.map(val => ({ value: val.id, label: val.name })));
            })
            .catch(e => {
                console.log(e);
                setTruckCatOptions([]);
            })
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "5%",
            fixed: 'left',
        },
        {
            title: "Tên xe tải",
            dataIndex: "name",
            key: "name",
            width: "25%",
            fixed: 'left',
        },
        {
            title: "Biển số xe",
            dataIndex: "license_plate",
            key: "license_plate",
            width: "20%",
            fixed: 'left',
        },
        {
            title: "Loại xe",
            dataIndex: "cat_id",
            key: "catId",
            render: (catId) => {
                let search = truckCatOptions.filter(val => val.value == catId);
                return search.length > 0 ? search[0]['label'] : "";
            },
            width: "20%",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <>
                    {(status == truckStatusOptions[0]["value"]) && (
                        <Tag color="success">
                            {truckStatusOptions[0]["label"]}
                        </Tag>
                    )}
                    {(status == truckStatusOptions[1]["value"]) && (
                        <Tag color="processing">
                            {truckStatusOptions[1]["label"]}
                        </Tag>
                    )}
                    {(status == truckStatusOptions[2]["value"]) && (
                        <Tag color="error">
                            {truckStatusOptions[2]["label"]}
                        </Tag>
                    )}
                </>
            ),
            width: "15%",
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
                            object: "xe tải",
                            data: record,
                            labelInKeys: [{
                                label: "ID",
                                key: "id"
                            }, {
                                label: "Tên xe",
                                key: "name"
                            }, {
                                label: "Biển số xe",
                                key: "license_plate"
                            }],
                            onDeleteSubmit: onDeleteSubmit
                        })}>
                            <DeleteOutlined />
                        </a>
                    </Tooltip>
                    <Tooltip placement="topRight" title="Lịch trình hoạt động">
                        <a onClick={() => showTimelineModal(record)}>
                            <TruckOutlined />
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
                label="Tên xe tải"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên xe tải!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tên xe tải"/>
            </Form.Item>
            <Form.Item
                label="Biển số xe"
                name="license_plate"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập biển số xe!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập biển số xe"/>
            </Form.Item>
            <Form.Item
                label="Loại xe"
                name="cat_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn loại xe!",
                    },
                ]}
            >
                <Select
                    options={truckCatOptions}
                    placeholder="Vui lòng chọn loại xe"
                />
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
                <Input disabled />
            </Form.Item>
            <Form.Item
                label="Tên xe tải"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên xe tải!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập tên xe tải"/>
            </Form.Item>
            <Form.Item
                label="Biển số xe"
                name="license_plate"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập biển số xe!",
                    },
                ]}
            >
                <Input placeholder="Vui lòng nhập biển số xe" />
            </Form.Item>
            <Form.Item
                label="Loại xe"
                name="cat_id"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng chọn loại xe!",
                    },
                ]}
            >
                <Select
                    options={truckCatOptions}
                    placeholder="Vui lòng chọn loại xe"
                />
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
                    options={truckStatusOptions}
                    placeholder="Vui lòng chọn trạng thái"
                />
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
                name="tài xế"
                isModalVisible={isCreateModalVisible}
                setIsModalVisible={setIsCreateModalVisible}
                form={formCreate}
            >
                {createFormList}
            </CreateModal>
            <UpdateModal
                name="xe tải"
                isModalVisible={isUpdateModalVisible}
                setIsModalVisible={setIsUpdateModalVisible}
                form={formUpdate}
            >
                {updateFormList}
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

export default Truck;