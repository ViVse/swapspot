import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "./config/axios";
import { getCookie } from "./utils/cookie";
import { fetchNotifications } from "./store/notification-actions";
import { authActions } from "./store/auth-slice";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Search from "./pages/Search/Search";
import Favorite from "./pages/Favorite/Favorite";
import MyProducts from "./pages/MyProducts/MyProducts";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import UserProducts from "./pages/UserProducts/UserProducts";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import MyOffers from "./pages/MyOffers/MyOffers";
import Offer from "./pages/Offer/Offer";
import Notifications from "./pages/Notifications/Notifications";
import useSocketIo from "./hooks/use-socket.io";

function App() {
  const user = useSelector((state) => state.auth.user);
  const { socket } = useSocketIo();
  const dispatch = useDispatch();

  // check if logged in
  useEffect(() => {
    const authToken = getCookie("x-auth-token");
    if (!authToken) return;

    axios
      .get("/api/users/me")
      .then((res) => dispatch(authActions.login(res.data.me)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  // load notifications
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // add user to socket
  useEffect(() => {
    if (!user) return;
    socket.emit("addUser", user._id);
  }, [user, socket]);

  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="grow">
            <Routes>
              <Route path="/search" element=<Search /> />
              <Route path="/product/:id" element=<Product /> />
              <Route path="/products/user/:id" element=<UserProducts /> />
              {user && (
                <>
                  <Route path="/favorite" element=<Favorite /> />
                  <Route path="/my-products" element=<MyProducts /> />
                  <Route path="/create" element=<CreateProduct /> />
                  <Route path="/offers" element=<MyOffers /> />
                  <Route path="/offer/:id" element=<Offer /> />
                  <Route path="/notifications" element=<Notifications /> />
                </>
              )}
              {!user && (
                <>
                  <Route path="/login" element=<Login /> />
                  <Route path="/signup" element=<SignUp /> />
                </>
              )}
              <Route path="/" element=<Home /> />
              <Route path="*" element={<p>Sorry</p>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
