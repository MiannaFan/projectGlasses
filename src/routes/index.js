import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Featured from "../pages/Featured";
import Recommended from "../pages/Recommended";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Search from "../pages/Search";

import NotFound from "../pages/NotFound";

import ProductDetail from "../pages/ProductDetail";
// import App from "../App";
// import { Navigate } from "react-router-dom";

export default [
  {
    path: "/",
    element: <Home />,
    // children: [],
  },
  { path: "/shop", element: <Shop /> },
  { path: "/featured", element: <Featured /> },
  { path: "/recommended", element: <Recommended /> },
  { path: "/search", element: <Search /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Signin /> },
  { path: "/product/:id", element: <ProductDetail /> },
  { path: "/product", element: <ProductDetail /> },

  { path: "*", element: <NotFound /> },
];
