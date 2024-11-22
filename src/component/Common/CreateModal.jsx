import React, { useState, useEffect } from "react";

import { Modal, Form } from "antd";

const CreateModal = ({ object, isModalVisible, setIsModalVisible, form, children }) => {
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleOk = () => {
        form.submit();
    };
    return (
        <Modal
            title={`Thêm mới ${object}`}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={`Thêm mới`}
            cancelText="Huỷ"
        >
            {children}
        </Modal>
    )
}

export default CreateModal;