import { useState, useEffect } from "react";
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
// import Cost from "./component/Cost/Cost";
import LoginPage from "./component/Login/Login";
import CostPage from "./component/Cost/CostPage";

message.config({
  maxCount: 1
})

const App = () => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const [current, setCurrent] = useState(MenuItems[0].key);
  const [profile, setProfile] = useState({
    id: 1,
    fullname: "Nguyễn Văn A",
    is_admin: true,
  });

  useEffect(() => {
    setCurrent(MenuItems[6].key);
  }, [profile]);
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
                {current == "Dashboard" && <Dashboard setCurrent={setCurrent} profile={profile} />}
                {current == "Driver" && <Driver />}
                {current == "Customer" && <Customer />}
                {current == "Truck" && <Truck />}
                {current == "Order" && <Order profile={profile} />}
                {/* {current == "Cost" && <Cost />} */}
                {current == "Cost" && <CostPage />}
                {current == "Revenue" && <Revenue />}
                {current == "Award" && <Award />}
                {current == "User" && <User />}
              </div>
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  )
};
export default App;
