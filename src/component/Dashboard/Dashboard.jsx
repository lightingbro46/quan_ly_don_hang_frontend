import { useEffect, useState, Fragment } from "react";
import { Flex, Card, Typography, Image } from "antd";

import { apiSearch, handleActionCallback } from "../Common/Utils";

import logo from "../../assets/images/react.svg";

const { Title } = Typography;

const loadFunction = () => {
    return apiSearch({
        url: "http://localhost:3000/api/report/overview"
    })
}
const items = [
    {
        name: "Customer",
        key: "customer",
        label: ["Khách hàng"],
        background: "#7320be"
    },
    {
        name: "Order",
        key: "order",
        label: ["Đơn hàng"],
        background: "#2b790e"
    },
    {
        name: "User",
        key: "user",
        label: ["Nhân viên"],
        background: "#0f76e0"
    },
    {
        name: "Driver",
        key: "driver",
        label: ["Tài xế"],
        background: "#1cdff2"
    },
    {
        name: "Truck",
        key: "truck",
        label: ["Xe tải"],
        background: "#e99f17"
    },
    {
        name: "Truck",
        key: "truck_unavailable",
        label: ["Xe tải", "đang bảo dưỡng"],
        background: "#dc5c11"
    },
]

const Dashboard = ({ setCurrent }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({})

    useEffect(() => {
        setLoading(true);
        loadFunction()
            .then((res) => {
                const { totalCount } = res;
                setData(totalCount);
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    return (
        <Card
            loading={loading}
        >
            {items.map((value, index) => (
                <Card.Grid
                    key={index}
                    style={{
                        width: "33%",
                        height: "25vh",
                        margin: "2px",
                        paddingInlineStart: "32px",
                        paddingInlineEnd: "32px",
                        textAlign: "start",
                        backgroundColor: value.background,
                        borderRadius: "20px"

                    }}
                    onClick={() => setCurrent(value.name)}
                >
                    <Flex
                        vertical={false}
                        justify="space-between"
                        align="center"
                    >
                        <Flex vertical >
                            <Title level={2} style={{ color: "white" }}>
                                {data[value["key"]] || 0}
                            </Title>
                            <Title level={4} style={{ color: "white" }}>
                                {value["label"].map((line, index) => (
                                    <Fragment key={index}>
                                        {line}
                                        <br />
                                    </Fragment>
                                ))}
                            </Title>
                        </Flex>
                        <Flex align="center" justify="center">
                            <Image src={logo} alt="image" width={"64px"} preview={false} />
                        </Flex>
                    </Flex>
                </Card.Grid>
            ))
            }
        </Card >
    )
}

export default Dashboard;
