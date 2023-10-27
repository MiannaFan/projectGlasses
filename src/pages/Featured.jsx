import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchFeatureList } from "../store/product";
import { Link } from "react-router-dom";

export default function Featured() {
  const featureList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeatureList());
  }, []);
  return (
    <>
      <div className="content">
        <div className="benefit_main">
          <div className="benefit_left banner">
            <h1>
              Featured <br />
              Products
            </h1>
          </div>
          <div className="benefit_right">
            <div className="featured_image image"></div>
          </div>
        </div>
      </div>
      <div className="product">
        {/* <div className="title">
            <h1>Featured Products</h1>
            <NavLink to="/featured">See All</NavLink>
          </div> */}
        <ul>
          {featureList.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <div className="productDetail">
                    <div className="picture">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="detail">
                      <h2>{item.name}</h2>
                      <p>{item.brand}</p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
