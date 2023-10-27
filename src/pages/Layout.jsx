import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MyAccountTest from "../component/MyAccountTest.jsx";
import useBasket from "../hooks/useBasket";
import { setBasketlistCount } from "../store/userSlice.js";
// import { setRemoveBasket } from "../store/userSlice";
// import routes from "../routes";
export default function Layout() {
  const isSignIn = useSelector((state) => state.user.isSignIn);

  const basketList = useSelector((state) => state.user.basketList);
  // const user = useSelector((state) => console.log(state.user));
  console.log(basketList);

  const { removeBasket, clearBasket } = useBasket();
  const dispatch = useDispatch();
  // console.log(basketList);
  const [isEmpty, setIsEmpty] = useState(true);
  useEffect(() => {
    basketList.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
  }, [basketList]);
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(true);
  };
  const handleClickClose = () => {
    setIsActive(false);
  };

  // const addCount = () => {
  //   basketList.forEach((element) => {
  //     console.log(element);
  //     element.count = 1;
  //     dispatch(setRemoveBasket(basketList));
  //   });
  // };
  // addCount();

  const [quantity, setQuantity] = useState(1);
  const handleClickAdd = (id) => {
    dispatch(setBasketlistCount(id));
    // setQuantity(quantity + 1);
  };
  const handleClickMinus = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

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
              <img src="./assets/download.png" alt="logo" />
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
              <NavLink to="/search">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search product..."
                    aria-label="Search"
                  />
                </form>
              </NavLink>
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleClick}
              >
                <img src="./assets/shopping-bag.png" alt="shopping" />
              </button>
              {isSignIn ? (
                <MyAccountTest />
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
        <div className="basket" style={{ right: isActive ? "0" : "-600px" }}>
          <div className="basket-list">
            <div className="basket-header">
              <h3 className="basket-header-title">
                My Basket &nbsp;<span>( 0 item)</span>
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
                            <img src="./assets/icons8-plus-24.png" alt="plus" />
                          </button>
                          <button type="button" onClick={handleClickMinus}>
                            <img
                              src="./assets/icons8-minus-24.png"
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
                              <h6>{item.sizes[0]}mm</h6>
                            </div>
                            <div className="color">
                              <span>Color</span>
                              <div
                                style={{
                                  backgroundColor: item.availableColors[0],
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="item-price">
                          <h4>${item.price * quantity}.00</h4>
                        </div>
                        <button
                          className="item-delete"
                          type="button"
                          onClick={() => handleClickRemove(item.id)}
                        >
                          <img src="./assets/icons8-close-50.png" alt="close" />
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
              <h2 className="basket-total-amount">$0.00</h2>
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
      </div>
      {/* {element} */}
    </>
  );
}
