import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecommendList } from "../store/product";
import { Link } from "react-router-dom";

export default function Recommended() {
  const recommendList = useSelector((state) => state.product.recommendList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecommendList());
  }, []);

  return (
    <>
      <div className="content">
        <div className="benefit_main">
          <div className="benefit_left banner">
            <h1>
              Recommended <br />
              Products
            </h1>
          </div>
          <div className="benefit_right">
            <div className="recommend_image image"></div>
          </div>
        </div>
      </div>
      <div className="product">
        <ul>
          {recommendList.map((item) => {
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
