import { Link, NavLink, Outlet } from "react-router-dom";
import "./LayoutAdmin.scss";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { Button, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import MenuCP from "../../components/MenuCP";
import { useState } from "react";

const siderStyle = {
  backgroundColor: '#ffffff',
};

function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <section className="layout-admin">
        <header className="header">
          <div className="header__logo">
            <Link to="/">IT Admin</Link>
          </div>
          <ul className="header__right">
            <li className="header__admin">
              <NavLink to="/">
                <Button>
                  <MdOutlineManageAccounts />
                  Home
                </Button>
              </NavLink>
            </li>
            <li className="header__admin">
              <NavLink to="/logout">
                <Button>
                  <RiLogoutCircleLine />
                  Logout
                </Button>
              </NavLink>
            </li>
          </ul>
        </header>
        <main className="main">
          <Layout>
            <Sider style={siderStyle} collapsed={collapsed}>
              <MenuCP />
            </Sider>
            <Content>
              <div>
                <Button onClick={() => setCollapsed(!collapsed)}>
                  {collapsed ? <TbLayoutSidebarRightCollapseFilled /> : <TbLayoutSidebarLeftCollapseFilled />}
                </Button>
              </div>
              <Outlet />
            </Content>
          </Layout>
        </main>
        <footer className="footer">
          <ul className="footer__left">
            <li>Facebook</li>
            <li>Instargram</li>
          </ul>
          <ul className="footer__right">
            <li>We will help you get a good job</li>
            <li>We will help the companies find the good employees</li>
            <li></li>
          </ul>
        </footer>
      </section>
    </>
  )
}

export default LayoutAdmin;