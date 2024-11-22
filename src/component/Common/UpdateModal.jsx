import React from "react";

import { Modal } from "antd";

const UpdateModal = ({ object, isModalVisible, setIsModalVisible, form, children }) => {
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleOk = () => {
        form.submit();
    };

    return (
        <Modal
            title={`Cập nhật ${object}`}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={`Cập nhật`}
            cancelText="Huỷ"
        >
            {children}
        </Modal>
    )
}

export default UpdateModal;