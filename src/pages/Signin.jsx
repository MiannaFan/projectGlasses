import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  setIsSignIn,
  setUserEmail,
  setRemoveBasket,
  setIsLoading,
} from "../store/userSlice";

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();

  const getEmail = () => {
    setEmail(emailRef.current.value);
  };

  const getPassword = () => {
    setPassword(passwordRef.current.value);
  };
  const auth = getAuth();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = signInWithEmailAndPassword(auth, email, password);
      console.log(res.user, "success");
      dispatch(setIsSignIn(true));
      dispatch(setIsLoading(false));
      dispatch(setUserEmail(`${email}`));
      dispatch(setRemoveBasket([]));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="signInContent">
        <div className="sign_wrap">
          <div className="benefit_main">
            <div className="benefit_left">
              <div className="title">
                <h3>Sign in to Salinaka</h3>
              </div>
              <form className="form" onSubmit={handleClick}>
                <div className="formitem">
                  <label htmlFor="email" className="lable">
                    *Email
                  </label>
                  <input
                    type="email"
                    placeholder="test@example.com"
                    className="email"
                    onBlur={getEmail}
                    ref={emailRef}
                  />
                </div>
                <div className="formitem">
                  <label htmlFor="password" className="lable">
                    *Password
                  </label>
                  <input
                    type="password"
                    placeholder="Your Password"
                    className="email phone password"
                    onBlur={getPassword}
                    ref={passwordRef}
                  />
                </div>

                <div className="choose_destination">
                  <input className="button" type="submit" value="Sign In" />
                </div>
              </form>
            </div>
            <div className="benefit_middle">
              <div className="up"></div>
              <div>OR</div>
              <div className="up"></div>
            </div>
            <div className="benefit_right">
              <button className="facebook">
                <div>
                  <img src="./assets/facebook-6-16.png" alt="" />
                  Continue with Facebook
                </div>
              </button>
              <button className="google">
                <div>
                  <img src="./assets/icons8-google-32.png" alt="" />
                  Continue with Google
                </div>
              </button>
              <button className="gitbub">
                <div>
                  <img src="./assets/icons8-github-30.png" alt="" />
                  Continue with GitHub
                </div>
              </button>
            </div>
          </div>
          <div className="sign_down">
            <span>Don't have an account?</span>
            <NavLink to="/signup">
              <button>Sign Up</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
