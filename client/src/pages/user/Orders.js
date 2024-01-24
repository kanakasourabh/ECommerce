import React from "react";
import Layout from "../../components/Layout/Layout";
import UserManu from "../../components/Layout/UserMenu";

const Orders = () => {
  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserManu />
          </div>
          <div className="col-md-9">
            <h1>All Order</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
