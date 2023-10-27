import { Outlet } from "react-router-dom";
import Layout from "./pages/Layout";
// import Register1 from "./component/Register1";
// import { app } from "./service/config";
// import AddData from "./component/AddData";
// import ReadData from "./component/ReadData";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
function App() {
  const element = useRoutes(routes);
  return (
    <>
      <Layout />

      <Outlet />
      {element}
      {/* <Register1 /> */}
      {/* <AddData />
      <ReadData /> */}
    </>
  );
}

export default App;
