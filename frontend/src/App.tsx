import { lazy, useCallback, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar/Navbar";
import { api } from "./utils/api/api";

const Home = lazy(() => import("./components/pages/home/Home"));
const UserInfo = lazy(() => import("./components/pages/usersInfo/UsersInfo"));

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserInfo />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
