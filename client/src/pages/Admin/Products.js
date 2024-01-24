import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Layout } from "antd";

const Products = () => {
  return (
    <Layout>
      <div>
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="text-center">All Product Lists</div>
      </div>
    </Layout>
  );
};

export default Products;
