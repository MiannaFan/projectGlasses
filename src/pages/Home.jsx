// Show the home page that contains the whole products
import React, { useEffect } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatureList, fetchRecommendList } from "../store/product";
export default function Home(props) {
  const featureList = useSelector((state) => state.product.productList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeatureList());
  }, []);

  const recommendList = useSelector((state) => state.product.productList);

  useEffect(() => {
    dispatch(fetchRecommendList());
  }, []);

  return (
    <>
      <Outlet />

      <div className="content">
        <div className="benefit_main">
          <div className="benefit_left">
            <h1>See everything with Clarity</h1>
            <div className="body-display">
              Buying eyewear should leave you happy and good-looking, with money
              in your pocket. Glasses, sunglasses, and contacts—we’ve got your
              eyes covered.
            </div>
            <div className="choose_destination">
              <NavLink to="/shop">
                <div>
                  SHOP NOW
                  <img src="./assets/icons8-arrow-48.png" alt="" />
                </div>
              </NavLink>
            </div>
          </div>
          <div className="benefit_right">
            <div className="benefit_image image"></div>
          </div>
        </div>
      </div>
      <div className="product">
        <div className="title">
          <h1>Featured Products</h1>
          <NavLink to="/featured">See All</NavLink>
        </div>
        <ul>
          {featureList.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`product/${item.id}`}>
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
      <div className="product">
        <div className="title">
          <h1>Recommended Products</h1>
          <NavLink to="/recommended">See All</NavLink>
        </div>
        <ul>
          {recommendList.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`product/${item.id}`}>
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

      <footer className="footer">
        <div className="footer-col-1">
          <strong>
            <span>
              Developed by{" "}
              <a href="https://www.solely.world/">Solely Bootcamp</a>
            </span>
          </strong>
        </div>
        <div className="footer-col-2">
          <img
            alt="Footer logo"
            className="footer-logo"
            src="./assets/download.png"
          />
          <h5>©&nbsp;2023</h5>
        </div>
        <div className="footer-col-3">
          <strong>
            <span>
              Fork this project &nbsp;
              <a href="https://github.com/LeeMary1204/Solely-ecommerce-react.git">
                HERE
              </a>
            </span>
          </strong>
        </div>
      </footer>
    </>
  );
}
