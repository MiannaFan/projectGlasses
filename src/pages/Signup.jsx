import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const navigate = useNavigate();
  const db = getFirestore(app);
  const [uname, setUname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const unameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const getUname = () => {
    setUname(unameRef.current.value);
  };
  const getEmail = () => {
    setEmail(emailRef.current.value);
  };
  const getPassword = () => {
    setPassword(passwordRef.current.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const userObj = {
        name: uname,
        email,
        password,
        id: res.user.uid,
      };
      console.log(res.user);
      const docRef = await addDoc(collection(db, "users"), userObj);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="sign">
        <div className="sign_wrap">
          <div className="benefit_main">
            <div className="benefit_left">
              <div className="title">
                <h3>Sign up to Salinaka</h3>
              </div>
              <form action="#" className="form" onSubmit={handleClick}>
                <div className="formitem">
                  <label htmlFor="Name" className="lable">
                    *Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    onBlur={getUname}
                    ref={unameRef}
                  />
                </div>
                <div className="formitem">
                  <label htmlFor="email" className="lable">
                    *Email
                  </label>
                  <input
                    type="email"
                    placeholder="Your email"
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
                {/* <NavLink to="/signin"> */}
                <div className="choose_destination">
                  <input className="button" type="submit" value="Sign Up" />
                </div>
                {/* </NavLink> */}
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
            <span>Already have an account?</span>
            <NavLink to="/signin">
              <button>Sign In</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
