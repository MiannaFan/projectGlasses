import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";

export default function ReadData() {
  const db = getFirestore(app);
  const GetData = async () => {
    // const docRef = doc(db, "productList");
    const querySnapshot = await getDocs(collection(db, "productList"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      console.log(doc.data());
    });
  };
  return (
    <div>
      <button onClick={GetData}>get</button>
    </div>
  );
}
