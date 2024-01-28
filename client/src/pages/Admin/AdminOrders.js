import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import axios from "axios";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All orders data"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders &&
            orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td scope="row">{i + 1}</td>
                        <td scope="row">
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <option key={i} value={s}>
                                {s}
                              </option>
                            ))}
                          </Select>
                        </td>
                        <td scope="row">{o?.buyer?.name}</td>
                        <td scope="row">{moment(o?.createdAt).fromNow()}</td>
                        <td scope="row">
                          {o?.payment.success ? "Success" : " Failed"}
                        </td>
                        <td scope="row">{o?.products?.length}</td>
                        {/* <th>{o?.}</th> */}
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o &&
                      o?.products?.map((p, i) => (
                        <div className="row m-2 p-3 card flex-row" key={p._id}>
                          <div className="col-md-8 " style={{ width: "18rem" }}>
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                            />
                          </div>
                          <div className="col-md-4">
                            <h4>{p.name}</h4>
                            <p> {p.description.substring(0, 30)}...</p>
                            <h4>Price: {p.price}</h4>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
