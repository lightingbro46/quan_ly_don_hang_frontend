import { useState, useEffect } from "react";
import { Modal, Form, message } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { handleActionCallback } from "./Utils";
import useSWR from 'swr';
import Page500 from "./Page500";

const formItemLayout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
    style: {
        maxWidth: 600,
    }
}

const FormInModal = ({
    id,
    getDetailFunc,
    createDataFunc,
    updateDataFunc,
    handlePreProcess,
    handlePostProcess,
    open,
    setOpen,
    children
}) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        values = handlePostProcess ? handlePostProcess(values) : values;
        handleActionCallback(!id ? createDataFunc : updateDataFunc, values)
            .then((res) => {
                setOpen(false);
            })
            .catch(e => {
                console.log(e)
            })
    }

    const onFinishFailed = (e) => {
        console.log(e);
    }

    const { data, error, isLoading, isValidating } = useSWR(id ? id : null, getDetailFunc);

    if (error) return <Page500 />

    return (
        <Modal
            title={!id ? "Thêm mới" : "Cập nhật"}
            open={open}
            loading={isValidating}
            okText={!id ? "Thêm mới" : "Cập nhật"}
            okButtonProps={{
                autoFocus: true,
                htmlType: 'submit',
            }}
            cancelText="Huỷ"
            onCancel={() => setOpen(false)}
            destroyOnClose
            modalRender={(dom) => (
                <Form
                    name="form_in_modal"
                    form={form}
                    initialValues={handlePreProcess ? handlePreProcess(data) : data}
                    clearOnDestroy
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    {...formItemLayout}
                >
                    {dom}
                </Form>
            )}
        >
            {children}
        </Modal>
    )
}

export default FormInModal;

const { confirm } = Modal;

const showDeleteConfirms = ({
    record,
    contentConfirm,
    deleteDataFunc,
}) => {
    const onDeleteSubmit = (id) => {
        handleActionCallback(deleteDataFunc, id)
            .then((res) => { })
            .catch(e => {
                console.log(e)
            })
    }

    confirm({
        title: `Bạn có muốn thực hiện xoá thông tin?`,
        icon: <ExclamationCircleFilled />,
        content: contentConfirm(record),
        okText: 'Xoá',
        okType: 'danger',
        cancelText: 'Huỷ',
        onOk: () => onDeleteSubmit(id),
        onCancel: () => console.log('Cancel'),
    });
}

export { showDeleteConfirms };