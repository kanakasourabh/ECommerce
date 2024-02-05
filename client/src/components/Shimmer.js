import React from "react";

const Shimmer = () => {
  // Number of shimmering cards
  const numberOfCards = 5;

  const shimmerCards = Array.from({ length: numberOfCards }, (_, index) => (
    <div className="shimmer-card-container">
      <div key={index} className="product-card">
        <div className="shimmer-wrapper">
          <div className="shimmer"></div>
        </div>
        {/* Other product card content goes here */}
        {/* <div className="product-details">
          <h2>Product Name</h2>
          <p>Description goes here.</p>
          <span>$19.99</span>
        </div> */}
      </div>
    </div>
  ));

  return <div className="shimmer-card-container">{shimmerCards}</div>;
};

export default Shimmer;
