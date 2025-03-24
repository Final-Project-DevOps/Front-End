import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white-900 text-black">
      <main className="flex-grow flex justify-center items-center">
        <Navbar/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
