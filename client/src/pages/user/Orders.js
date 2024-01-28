import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserManu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserManu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Order</h1>
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
                          <td scope="row">{o?.status}</td>
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
                          <div
                            className="row m-2 p-3 card flex-row"
                            key={p._id}
                          >
                            <div
                              className="col-md-8 "
                              style={{ width: "18rem" }}
                            >
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
      </div>
    </Layout>
  );
};

export default Orders;
