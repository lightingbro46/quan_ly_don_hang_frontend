import { useState } from "react";
import { Modal, DatePicker } from "antd";

import LoadTable from "./LoadTable";

const TimelineModal = ({ name, record, isModalVisible, setIsModalVisible, loadFunction }) => {
    const [loading, setLoading] = useState(true);

    return (
        <Modal
            title={`Lịch trình ${name}`}
            width={"50vw"}
            footer={null}
            open={isModalVisible}
            onOk={handleOk}
            okText={`Thêm mới`}
            cancelText="Huỷ"
            centered
        >
            Content
            {/* <LoadTable loadFunction={loadFunction} /> */}
        </Modal>
    )
}

export default TimelineModal;