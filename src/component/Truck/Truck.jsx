import { useEffect, useState } from "react";
import { Space, Form, Input, Select, Tooltip, Tag } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from "@ant-design/icons"
import CreateModal from "../Common/CreateModal";
import UpdateModal from "../Common/UpdateModal";
import showDeleteConfirm from "../Common/DeleteModal";
import LoadTable from "../Common/LoadTable";
import { apiSearch, handleActionCallback } from "../Common/Utils";
import { truck_data } from "../mock";

const loadFunction = (queryParams) => {
    return new Promise(resolve => resolve(truck_data))
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

const Truck = () => {
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [initUpdateModalData, setInitUpdateModalData] = useState({});

    const [reload, setReload] = useState(false);
    const triggerReload = () => setReload((prev) => !prev);

    const [formCreate] = Form.useForm();
    const [formUpdate] = Form.useForm();

    const [optionsTruckCat, setOptionsTruckCat] = useState([]);

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
            title: "Tên xe",
            dataIndex: "name",
            key: "name",
            width: "20%",
        },
        {
            title: "Biển số xe",
            dataIndex: "license_plate",
            key: "license_plate",
            width: "15%",
        },
        {
            title: "Loại xe",
            dataIndex: "cat_id",
            key: "catId",
            render: (catId) => {
                let search = optionsTruckCat.filter(val => val.value == catId);
                return search.length > 0 ? search[0]['label'] : "";
            },
            width: "10%",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Space size="middle">
                    {(status == 1) && (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            Sẵn sàng
                        </Tag>
                    )}
                    {(status == 2) && (
                        <Tag icon={<SyncOutlined spin />} color="processing">
                            Đang hoạt động
                        </Tag>
                    )}
                    {(status == 3) && (
                        <Tag icon={<MinusCircleOutlined />} color="error">
                            Bảo dưỡng
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
                            object: "xe tải",
                            data: record,
                            labelInKeys: [{
                                label: "Mã xe tải",
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

    useEffect(() => {
        loadOptionTruckCatFunction()
            .then(res => {
                setOptionsTruckCat(res.results.map(val => ({ value: val.id, label: val.name })));
            })
            .catch(e => {
                console.log(e);
                setOptionsTruckCat([]);
            })
    }, []);

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
                label="Tên xe"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên xe!",
                    },
                ]}
            >
                <Input />
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
                <Input />
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
                    options={optionsTruckCat}
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
                label="Mã xe tải"
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
                label="Tên xe"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên xe!",
                    },
                ]}
            >
                <Input />
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
                <Input />
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
                    options={optionsTruckCat}
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
                    options={[
                        { value: 1, label: "Bình thường" },
                        { value: 2, label: "Bảo dưỡng, loại bỏ" },
                    ]}
                    placeholder="Vui lòng chọn trạng thái"
                />
            </Form.Item>
        </Form>
    );

    return (
        <>
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
            <LoadTable
                columns={columns}
                loadFunction={loadFunction}
                reload={reload}
            />
        </>
    )
}

export default Truck;