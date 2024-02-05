import React from "react";
import { useNavigate } from "react-router-dom";

const CartShimmer = () => {
  const navigate = useNavigate();
  return (
    <div className="empty-cart-container">
      {/* <div className="shimmer-wrapper">
        <div className="shimmer"></div>
      </div> */}
      <div className="empty-cart-content">
        <h2>Your Cart is Empty</h2>
        <p>Add items to your cart to proceed with the checkout.</p>
        <button
          type="button"
          class="btn btn-warning"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
        {/* <button className="continue-shopping-button"></button> */}
      </div>
    </div>
  );
};

export default CartShimmer;
