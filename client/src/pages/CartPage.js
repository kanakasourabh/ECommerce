import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyle.css";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Count total
  const totalPrice = () => {
    try {
      let total = 0;
      cart &&
        cart?.map((item) => {
          total = total + item?.price;
        });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Delete Cart Item
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get token Gateway

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment successfull");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4 className="bg-light p-2 mb-1 mt-4 --text-color-black">
              <span class="your-cart">YOUR CART</span>
              {/* {`Hello ${auth?.token && auth?.user?.user?.name}`} */}
            </h4>
            {/* <h4 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : " Your cart is Empty"}
            </h4> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div>
              <button class="apply-coupon-button" fdprocessedid="3p1ph">
                <div class="apply-coupen-symbol-whitetheme">%</div>
                <span class="Apply-coupon">Apply Coupon </span>
              </button>
            </div>
            {cart &&
              cart?.map((p) => (
                <div className="row   card flex-row">
                  <div className="col-md-5 " style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-4 flex-column">
                    <h4>{p.name}</h4>
                    <p> {p.description.substring(0, 30)}...</p>
                    <div>⭐⭐⭐⭐⭐</div>
                    <p>
                      Standard Delivery by <br />
                      within 5 days | <br /> free
                    </p>

                    <div className="flex flex-wrap ">
                      <button
                        className="btn btn-secondary"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Move to wishList
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="col-md-3 flex-column">
                    <h5 className="text-sm-end fw-bold">₹ {p.price}.00</h5>
                    <p className="text-end">(Incl. all Taxes)</p>
                    <hr />
                  </div>
                </div>
              ))}
          </div>
          <div className="col-md-4 text-center">
            {/* <h2>Cart Summary</h2> */}
            {/* <p>Total | Checkout | Payment</p> */}
            <p>Order Summary ( {cart?.length} item )</p>
            <hr />
            <h6>Original Price: {totalPrice()}</h6>
            <h6>Total Price: {totalPrice()}</h6>
            {auth?.user?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current address</h4>
                  <h5>{auth?.user?.user?.address}</h5>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ....." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
