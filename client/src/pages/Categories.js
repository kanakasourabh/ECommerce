import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories &&
            categories?.map((c) => (
              <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <Link
                  to={`/category/${c.slug}`}
                  className="btn btn-primary text-light"
                >
                  {c.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
