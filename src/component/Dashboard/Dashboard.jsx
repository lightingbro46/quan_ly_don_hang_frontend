import { useEffect, useState, Fragment } from "react";
import { Flex, Card, Typography, Image } from "antd";

import { handleActionCallback } from "../Common/Utils";

import logo from "../../assets/images/react.svg";
import { dashboard_data } from "../mock";

const { Title } = Typography;

const items = [
    {
        name: "Customer",
        key: "Customer",
        label: ["Khách hàng"],
        url: "http://localhost:3000/api/customers/list",
        background: "#7320be"
    },
    {
        name: "Order",
        key: "Order",
        label: ["Đơn hàng"],
        url: "http://localhost:3000/api/orders/list",
        background: "#2b790e"
    },
    {
        name: "User",
        key: "User",
        label: ["Nhân viên"],
        url: "http://localhost:3000/api/users/list",
        background: "#0f76e0"
    },
    {
        name: "Driver",
        key: "Driver",
        label: ["Tài xế"],
        url: "http://localhost:3000/api/drivers/list",
        background: "#1cdff2"
    },
    {
        name: "Truck",
        key: "Truck",
        label: ["Xe tải"],
        url: "http://localhost:3000/api/trucks/list",
        background: "#e99f17"
    },
    {
        name: "UnavaiableTruck",
        key: "Truck",
        label: ["Xe tải", " đang bảo dưỡng"],
        url: "http://localhost:3000/api/trucks/list?status=2",
        background: "#dc5c11"
    },
]
const Dashboard = ({ setCurrent }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({})

    useEffect(() => {
        setData(dashboard_data);
        // items.forEach((value, index) => {
        //     fetch(value.url)
        //         .then(res => {
        //             if (res.ok) return res.json();
        //         })
        //         .then(res => {
        //             const { totalCount } = res;
        //             setData(prevValue => {
        //                 return {
        //                     ...prevValue,
        //                     [value.name]: totalCount
        //                 }
        //             })
        //         })
        //         .catch(e => { console.log(e) });
        // })
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
                    onClick={() => setCurrent(value.key)}
                >
                    <Flex
                        vertical={false}
                        justify="space-between"
                        align="center"
                    >
                        <Flex vertical >
                            <Title level={3} style={{ color: "white" }}>
                                {data[value.name] || 0}
                            </Title>
                            <Title level={4} style={{ color: "white" }}>
                                {value.label.map((line, index) => (
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
