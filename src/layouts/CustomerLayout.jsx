import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../index.css';

const CustomerLayout = ({ navbarTitle }) => {
  return (
    <div className="customer-layout">
      {navbarTitle && <Navbar title={navbarTitle} />}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;