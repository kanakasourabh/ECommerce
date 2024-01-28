import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserManu from "../../components/Layout/UserMenu";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"DashBoard - Ecommerce App"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserManu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User Name: {auth?.user?.name || auth?.user?.user?.name}</h3>
              <h3>
                User Email: {auth?.user?.email || auth?.user?.user?.email}
              </h3>
              <h3>
                User Address: {auth?.user?.address || auth?.user?.user?.address}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
