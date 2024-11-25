import React, { useState, useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, theme, message } from "antd";

import "./App.css";

const { Content } = Layout;

import SiderBar, { MenuItems } from "./component/Common/SiderBar";
import HeaderBar from "./component/Common/HeaderBar";
import Dashboard from "./component/Dashboard/Dashboard";
import Driver from "./component/Driver/Driver";
import Customer from "./component/Customer/Customer";
import Truck from "./component/Truck/Truck";
import Order from "./component/Order/Order";
import Revenue from "./component/Report/Revenue";
import Award from "./component/Report/Award";
import User from "./component/User/User";
import Cost from "./component/Cost/Cost";
import LoginPage from "./component/Login/Login";

message.config({
  maxCount: 1
})

const App = () => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const [current, setCurrent] = useState(MenuItems[0].key);
  const [profile, setProfile] = useState({
    fullname: "Nguyễn Văn A",
    is_admin: true,
  });

  // useEffect(() => {
  //   let items = [{
  //     href: "",
  //     title: <HomeOutlined />
  //   }]

  //   if (current.length >= 1)
  //     items.push({
  //       href: "",
  //       title: MenuItems.find((val) => val.key == current[0])["label"]
  //     })

  //   if (current.length == 2) {
  //     items.push({
  //       href: "",
  //       title: MenuItems.find((val) => val.key == current[0])["label"]
  //     })
  //     items.push({
  //       href: "",
  //       title: MenuItems.find((val) => val.key == current[0])["label"]
  //     })
  //   }
  //   setBreadcrumb(items);
  // }, [current])

  return (
    <>
      {(!profile) && (<LoginPage setProfile={setProfile} />)}
      {(profile) && (
        <Layout
          style={{
            minWidth: "100vw",
            minHeight: "100vh",
          }}
        >
          <SiderBar current={current} setCurrent={setCurrent} />
          <Layout>
            <HeaderBar profile={profile} setProfile={setProfile} />
            <Content
              style={{
                margin: "24px 16px 0",
                overflow: "initial",
              }}
            >
              {/* <Breadcrumb
                style={{
                  margin: "16px 0",
                }}
                items={breadcrumb}
              /> */}
              <div
                style={{
                  padding: "24px",
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {current.includes("Dashboard") && <Dashboard setCurrent={setCurrent} />}
                {current.includes("Driver") && <Driver />}
                {current.includes("Customer") && <Customer />}
                {current.includes("Truck") && <Truck />}
                {current.includes("Order") && <Order />}
                {current.includes("Cost") && <Cost />}
                {current.includes("Revenue") && <Revenue />}
                {current.includes("Award") && <Award />}
                {current.includes("User") && <User />}
              </div>
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  )
};
export default App;
