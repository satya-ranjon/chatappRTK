import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import Routers from "./routes";

const App = () => {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication .... </div>
  ) : (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

export default App;
