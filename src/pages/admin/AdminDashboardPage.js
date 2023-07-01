import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from './AdminMenu';
import { Outlet } from 'react-router-dom';

const AdminDashboardPage = () => {
  return (
    <Layout>
      <div className="container-fluid p-5">
        <div className="row p-5">
          <div className="col-md-3 mb-5">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {/* Based on the route , the outlet gets replaced with a component */}
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
