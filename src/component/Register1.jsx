import React, { useState, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";
import { collection, addDoc } from "firebase/firestore";

export default function Register1() {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form action="#" onSubmit={handleClick}>
        username: <input type="text" onBlur={getUname} ref={unameRef} />
        <br />
        password:
        <input type="password" onBlur={getPassword} ref={passwordRef} />
        <br />
        email: <input type="email" onBlur={getEmail} ref={emailRef} />
        <br />
        <input type="submit" value="Register" />
      </form>
    </>
  );
}
