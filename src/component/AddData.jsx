// Add the original products information to my firebase

import React from "react";
import { productList } from "../data";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";

export default function AddData() {
  const db = getFirestore(app);
  const postData = async () => {
    console.log(productList);
    try {
      for (let i = 0; i < productList.length; i++) {
        await addDoc(collection(db, "productList"), productList[i]);
      }
    } catch (error) {}
  };
  return (
    <div>
      <button onClick={postData}>post</button>
    </div>
  );
}
