import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from './UserMenu';
import { Outlet } from 'react-router-dom';

const UserDashboardPage = () => {
  return (
    <Layout>
      <div
        style={{ minHeight: '70vh' }}
        className="container-fluid custom-container mobile-height"
      >
        <div className="row p-5">
          <div className="col-12 col-md-2 col-lg-3 mb-5 ">
            <UserMenu />
          </div>
          <div className="col-md-10 col-lg-9">
            {/* Based on the route , the outlet gets replaced with a component */}
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboardPage;
