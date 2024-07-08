import React from 'react';
import { AiOutlineDashboard, AiFillCalendar, AiFillLayout } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function MenuCP() {
  const params = window.location.pathname.split('/');

  const items = [
    {
      key: 'admin',
      icon: <AiOutlineDashboard />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: 'companyInfo',
      icon: <FaRegBuilding />,
      label: <Link to="companyInfo">Company Infomation</Link>,
    },
    {
      key: 'manageJobs',
      icon: <AiFillCalendar />,
      label: <Link to="manageJobs">Manage Jobs</Link>,
    },
    {
      key: 'manageCVs',
      icon: <AiFillLayout />,
      label: <Link to="manageCVs">Manage CVs</Link>,
    }
  ];

  return (
    <>
      <Menu
        defaultSelectedKeys={[params[params.length-1]]}
        items={items}
      />
    </>
  )
}

export default MenuCP;