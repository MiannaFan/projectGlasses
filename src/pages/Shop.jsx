import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { setBasketList } from "../store/userSlice";
import useBasket from "../hooks/useBasket";

export default function Shop() {
  const { isInBasket, removeBasket, AddBasket } = useBasket();

  // const dispatch = useDispatch();
  // const basketList = useSelector((state) => state.user.basketList);
  const allList = useSelector((state) => state.product.productList);

  const handleClick = (item) => {
    // dispatch(setBasketList(item));
    // addCount();
    AddBasket({ ...item, count: 1 });
  };

  const handleClickRemove = (id) => {
    removeBasket(id);
  };

  return (
    <>
      <div className="filters-toggle" role="presentation">
        <button className="button-muted button-small" type="button">
          Filters &nbsp;
          <img src="./assets/filter.png" alt="" />
        </button>
      </div>
      <div className="allProduct">
        <ul>
          {allList.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <div className="productDetail">
                    <div className="picture">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="detail">
                      <h5>{item.name}</h5>
                      <p className="brand">{item.brand}</p>
                      <h4 className="price">${item.price}.00</h4>
                    </div>
                  </div>
                </Link>
                {isInBasket(item.id) ? (
                  <button
                    className="removeBasketButton"
                    type="button"
                    value={item}
                    onClick={() => handleClickRemove(item.id)}
                  >
                    Remove from basket
                  </button>
                ) : (
                  <button
                    className="addBasketButton"
                    type="button"
                    value={item}
                    onClick={() => handleClick(item)}
                  >
                    Add to basket
                  </button>
                )}
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
      <Outlet />
    </>
  );
}
