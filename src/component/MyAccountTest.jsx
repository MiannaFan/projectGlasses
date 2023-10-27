import React from "react";

import { getAuth, signOut } from "firebase/auth";
import { setIsSignIn } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyAccountTest() {
  const auth = getAuth();

  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = signOut(auth);
      console.log(res, "success");
      dispatch(setIsSignIn(false));
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button onClick={handleClick}>sign out</button>
    </>
  );
}
