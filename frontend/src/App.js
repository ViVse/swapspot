import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <div className="container mx-auto px-4">
        <Header />
        <Login />
      </div>
      <Footer />
    </>
  );
}

export default App;
