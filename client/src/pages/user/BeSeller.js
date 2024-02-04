import React from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const BeSeller = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
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
