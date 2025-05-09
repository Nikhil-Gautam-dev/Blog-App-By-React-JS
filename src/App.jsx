import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Authentication from "./components/appwrite/auth";
import { login, logout } from "./store/AuthSlice";
import "./App.css";
import Header from "./components/Header";
import { Footer } from "./components";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    Authentication.getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login({ userData: data }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-sc flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </div>
  ) : null;
}

export default App;
