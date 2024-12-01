import { useState } from "react";
import { Button, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import CostForm from "./CostForm";
import CostTable from "./CostTable";

const CostPage = () => {
    const [open, setOpen] = useState(false);
    const [inputData, setInputData] = useState(false);

    const showCreateModal = () => {
        setInputData();
        setOpen(true);
    }

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
            <CostForm
                id={(inputData && inputData["id"]) ? inputData["id"] : null}
                isDelete={inputData && inputData["isDelete"] ? inputData["isDelete"] : false}
                open={open}
                setOpen={setOpen}
            />
            <CostTable
                setOpen={setOpen}
                setInputData={setInputData}
            />
        </>
    )
}

export default CostPage;