import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Radio } from "antd";

const BeSeller = () => {
  const [email, setEmail] = useState();
  const [radio, setRadio] = useState(0);
  // console.log(radio);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/user-seller`,
        { email, radio }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);

        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong!!");
    }
  };
  return (
    <Layout>
      <div className="styles__Hero-sc-1apzq4x-0 czsuGj">
        <div className="styles__BreadcrumbContainer-sc-1t4s8kx-0 gKIgHL">
          <ul className="styles__BreadcrumbsList-sc-1t4s8kx-2 jfZHQv"></ul>
        </div>
        <div className="styles__BannerText-sc-1apzq4x-2 fPOyFL">
          <h1 className="styles__H1-sc-a90kxg-2 style__BannerHeadText-sc-1iksw1-0 cWSfmy">
            <span className="style__ColoredSpan-sc-1iksw1-1 bvEpHv">
              Sell Online with US
            </span>
          </h1>
        </div>
        <img
          src="https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/banner/Desktop_sell.webp"
          alt
          height
          width
          loading="lazy"
          className="styles__BannerWrapper-sc-1apzq4x-1 efNVbq"
        />
      </div>
      <div className="form-container">
        <h1>Please Submit the below form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              GSTIN
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              <div>
                <Radio value={1}>Yes</Radio>
              </div>
              <div>
                <Radio value={0}>No</Radio>
              </div>
            </Radio.Group>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Terms and Conditions
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default BeSeller;
