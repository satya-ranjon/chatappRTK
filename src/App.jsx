import { BrowserRouter, Route, Routes } from "react-router-dom";
import MessagesBox from "./components/inbox/MessagesBox";
import useAuthCheck from "./hooks/useAuthCheck";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication .... </div>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inbox" element={<Inbox />}>
          <Route path="/inbox/:id" element={<MessagesBox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
