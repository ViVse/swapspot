import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <>
      <div className="container mx-auto px-4">
        <Header />
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
