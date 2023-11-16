// The index page including navigation, basket and content
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MyAccount from "../component/MyAccount.jsx";
import useUser from "../hooks/useUser";
import useBasket from "../hooks/useBasket";
import useOutsideClick from "../hooks/useOutsideClick.js";
import { setIsLoading, setRemoveBasket } from "../store/userSlice";
import {
  setBasketlistCount,
  setBasketlistCountMinus,
} from "../store/userSlice.js";

export default function Layout() {
  const basketListRef = useRef(null);
  const dispatch = useDispatch();
  const isSignIn = useSelector((state) => state.user.isSignIn);

  // Get the user information list by the email signed in and transfer the user information to the redux
  const { fetchUser } = useUser();
  useEffect(() => {
    fetchUser();
    dispatch(setRemoveBasket([]));
    dispatch(setIsLoading(true));
  }, []);

  // To calculate the total amount and price of the basket items by reduce as every change of basketlist
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const basketList = useSelector((state) => state.user.basketList);
  useEffect(() => {
    const basketCountList = basketList.map((item) => {
      return item.count;
    });
    const basketTotalPriceList = basketList.map((item) => {
      return item.totalPrice;
    });
    setTotalCount(
      basketCountList.length === 0 ? 0 : basketCountList.reduce((a, b) => a + b)
    );
    setTotalPrice(
      basketTotalPriceList.length === 0
        ? 0
        : basketTotalPriceList.reduce((a, b) => a + b)
    );
  }, [basketList]);

  //get search input value
  const iptRef = useRef(null);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    const searchName = iptRef.current.value;
    if (e.keyCode === 13) {
      navigate(`/search/${searchName}`);
    }
  };

  // To judge if the basket is empty to render diffrent content
  const [isEmpty, setIsEmpty] = useState(true);
  useEffect(() => {
    basketList.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
  }, [basketList]);

  // Handle click the basket button to open basket
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(true);
  };
  //Handle click the close button to close the basket
  const handleClickClose = () => {
    setIsActive(false);
  };
  //Handle click the outside of baseket to close the basket
  useOutsideClick(basketListRef, handleClickClose);

  //Handle click to change the amount of individual product in the basket
  const handleClickAdd = (id) => {
    dispatch(setBasketlistCount(id));
  };
  const handleClickMinus = (id) => {
    dispatch(setBasketlistCountMinus(id));
  };

  // Handel click to remove or clear basket
  const { removeBasket, clearBasket } = useBasket();
  const handleClickRemove = (id) => {
    removeBasket(id);
  };
  const handleClickClear = () => {
    clearBasket();
  };
  return (
    <>
      <div className="index">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <NavLink to="/">
              <img src="/assets/download.png" alt="logo" />
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/shop">Shop</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/featured">Featured</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/recommended">Recommended</NavLink>
                </li>
              </ul>
              {/* <NavLink to="/search"> */}
              <div className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Search product..."
                  aria-label="Search"
                  ref={iptRef}
                  onKeyUp={handleSearch}
                />
              </div>
              {/* </NavLink> */}
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleClick}
              >
                <img src="/assets/shopping-bag.png" alt="shopping" />
              </button>
              {isSignIn ? (
                <MyAccount />
              ) : (
                <ul className="signup">
                  <NavLink to="/signup">
                    <li className=" signUp">Sign Up</li>
                  </NavLink>
                  <NavLink to="/signin">
                    <li className="signIn">Sign In</li>
                  </NavLink>
                </ul>
              )}
            </div>
          </div>
        </nav>
        {isActive && (
          <div
            ref={basketListRef}
            className="basket"
            style={{ right: isActive ? "0" : "-600px" }}
          >
            <div className="basket-list">
              <div className="basket-header">
                <h3 className="basket-header-title">
                  My Basket &nbsp;<span>( {totalCount} item)</span>
                </h3>
                <button
                  className="basket-toggle button button-border button-border-gray button-small"
                  role="presentation"
                  type="submit"
                  onClick={handleClickClose}
                >
                  Close
                </button>
                <button
                  className="basket-clear button button-border button-border-gray button-small"
                  type="button"
                  disabled=""
                  onClick={handleClickClear}
                >
                  <span>Clear Basket</span>
                </button>
              </div>
              {isEmpty ? (
                <div className="basket-empty">
                  <h5 className="basket-empty-msg">Your basket is empty</h5>
                </div>
              ) : (
                <ul>
                  {basketList.map((item) => {
                    return (
                      <li key={item.id}>
                        <div className="basket-item">
                          <div className="basket-control">
                            <button
                              type="button"
                              onClick={() => handleClickAdd(item.id)}
                            >
                              <img
                                src="/assets/icons8-plus-24.png"
                                alt="plus"
                              />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleClickMinus(item.id)}
                            >
                              <img
                                src="/assets/icons8-minus-24.png"
                                alt="minus"
                              />
                            </button>
                          </div>
                          <div className="basketItem-iamge">
                            <img src={item.image} alt="product" />
                          </div>
                          <div className="basketItem-dedail">
                            <div className="item-name">
                              <h4>{item.name}</h4>
                            </div>
                            <div className="item-detail">
                              <div className="quantity">
                                <span>Quantity</span>
                                <h6>{item.count}</h6>
                              </div>
                              <div className="size">
                                <span>Size</span>
                                <h6>{item.selectSize}mm</h6>
                              </div>
                              <div className="color">
                                <span>Color</span>
                                <div
                                  style={{
                                    backgroundColor: item.selectColor,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="item-price">
                            <h4>${item.price * item.count}.00</h4>
                          </div>
                          <button
                            className="item-delete"
                            type="button"
                            onClick={() => handleClickRemove(item.id)}
                          >
                            <img
                              src="/assets/icons8-close-50.png"
                              alt="close"
                            />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="basket-checkout">
              <div className="basket-total">
                <p className="basket-total-title">Subtotal Amout:</p>
                <h2 className="basket-total-amount">${totalPrice}.00</h2>
              </div>
              <button
                className="basket-checkout-button button"
                type="button"
                disabled=""
              >
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
      {/* {element} */}
    </>
  );
}
