import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Search from "./pages/Search/Search";
import Favorite from "./pages/Favorite/Favorite";
import MyProducts from "./pages/MyProducts/MyProducts";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="grow">
            <Routes>
              <Route path="/search" element=<Search /> />
              <Route path="/product/:id" element=<Product /> />
              {user && (
                <>
                  <Route path="/favorite" element=<Favorite /> />
                  <Route path="/my-products" element=<MyProducts /> />
                </>
              )}
              {!user && (
                <>
                  <Route path="/login" element=<Login /> />
                  <Route path="/signup" element=<SignUp /> />
                </>
              )}
              <Route path="/" element=<Home /> />
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
