// Get the user information list by the email signed in and transfer the user information to the redux

import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../service/config";
import { setUser, setIsLoading } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export default function useUser() {
  const email = useSelector((state) => state.user.email);
  const db = getFirestore(app);
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const q = query(collection(db, "users"), where("email", "==", `${email}`));
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach((doc) => {
      const res = doc.data();
      arr.push(res);
    });
    dispatch(setUser(arr));
    //set isloading after fetchUser successfully
    dispatch(setIsLoading(false));
  };
  return { fetchUser };
}
