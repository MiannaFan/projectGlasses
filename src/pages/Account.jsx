// Show the detail of myaccount when you click the 'my account'
import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function Account() {
  const userList = useSelector((state) => state.user.userList);
  console.log(userList);
  const [isActiveAccount, setIsActiveAccount] = useState(true);
  const [isActiveWish, setIsActiveWish] = useState(false);
  const [isActiveCheckout, setIsActiveCheckout] = useState(false);
  const handleClickAccount = () => {
    setIsActiveAccount(true);
    setIsActiveWish(false);
    setIsActiveCheckout(false);
  };
  const handleClickWishList = () => {
    setIsActiveAccount(false);
    setIsActiveWish(true);
    setIsActiveCheckout(false);
  };
  const handleClickCheckout = () => {
    setIsActiveAccount(false);
    setIsActiveWish(false);
    setIsActiveCheckout(true);
  };
  return (
    <>
      <main className="content">
        <div className="user-tab">
          <div className="user-tab-nav">
            <ul className="user-tab-menu">
              <li
                onClick={handleClickAccount}
                className={
                  "user-tab-item " + (isActiveAccount ? "user-tab-active" : "")
                }
                role="presentation"
              >
                Account
              </li>
              <li
                onClick={handleClickWishList}
                className={
                  "user-tab-item " + (isActiveWish ? "user-tab-active" : "")
                }
                role="presentation"
              >
                My Wish List
              </li>
              <li
                onClick={handleClickCheckout}
                className={
                  "user-tab-item " + (isActiveCheckout ? "user-tab-active" : "")
                }
                role="presentation"
              >
                My Orders
              </li>
            </ul>
          </div>
          <div className="user-tab-content">
            <div
              className="user-profile"
              style={{ display: isActiveAccount ? "flex" : "none" }}
            >
              <div className="user-profile-block">
                <div className="user-profile-banner">
                  <div className="user-profile-banner-wrapper">
                    <img
                      alt="Banner"
                      className="user-profile-banner-img is-img-loaded"
                      src="/assets/Banner.jpg"
                    />
                  </div>
                  <div className="user-profile-avatar-wrapper">
                    <img
                      alt="Avatar"
                      className="user-profile-img is-img-loaded"
                      src="/assets/Avatar.jpg"
                    />
                  </div>
                  <button
                    className="button button-small user-profile-edit"
                    type="button"
                  >
                    Edit Account
                  </button>
                </div>
                <div className="user-profile-details">
                  <h2 className="user-profile-name">{userList[0].name}</h2>
                  <span>Email</span>
                  <br />
                  <h5>{userList[0].email}</h5>
                  <span>Address</span>
                  <br />
                  <h5 className="text-subtle text-italic">Address not set</h5>
                  <span>Mobile</span>
                  <br />

                  <span>Date Joined</span>
                  <br />
                  <h5>October 15, 2023</h5>
                </div>
              </div>
            </div>
            <div
              className="loader"
              style={{ display: isActiveWish ? "flex" : "none" }}
            >
              <h3>My Wish List</h3>
              <strong>
                <span className="text-subtle">You don't have a wish list</span>
              </strong>
            </div>
            <div
              className="loader"
              style={{ display: isActiveCheckout ? "flex" : "none" }}
            >
              <h3>My Orders</h3>
              <strong>
                <span className="text-subtle">You don't have any orders</span>
              </strong>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
