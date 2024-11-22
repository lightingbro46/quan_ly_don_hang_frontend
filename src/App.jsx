import React, { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, theme, message, ConfigProvider } from "antd";

import "./App.css";

const { Content } = Layout;

import SiderBar, { MenuItems } from "./component/Common/SiderBar";
import HeaderBar from "./component/Common/HeaderBar";
import Driver from "./component/Driver/Driver";
import Customer from "./component/Customer/Customer";
import Truck from "./component/Truck/Truck";
import Order from "./component/Order/Order";

const App = () => {
  const [current, setCurrent] = useState(MenuItems[0].key);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider message={{ maxCount: 1 }}>
      <Layout
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
        }}
      >
        <SiderBar current={current} setCurrent={setCurrent} />
        <Layout>
          <HeaderBar />
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
              items={[
                {
                  href: "",
                  title: <HomeOutlined />,
                },
                {
                  href: "",
                  title: MenuItems.filter((val) => val.key == current)[0]["label"],
                },
              ]}
            />
            <div
              style={{
                padding: "24px",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {current == "Driver" && <Driver messageApi={messageApi} />}
              {current == "Customer" && <Customer messageApi={messageApi} />}
              {current == "Truck" && <Truck messageApi={messageApi} />}
              {current == "Order" && <Order messageApi={messageApi} />}
              {/* { current == "Cost" && <Cost messageApi={messageApi}/>} */}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
export default App;
