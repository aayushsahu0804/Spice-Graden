import React from "react";
import { Outlet } from "react-router-dom";
import "../index.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
