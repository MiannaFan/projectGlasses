import { Outlet } from "react-router-dom";
import Layout from "./pages/Layout";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
function App() {
  const element = useRoutes(routes);
  return (
    <>
      <Layout />

      <Outlet />
      {element}
    </>
  );
}

export default App;
