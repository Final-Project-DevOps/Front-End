import "./App.css";
import KnowHub from "./components/KnowHub";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-grow flex justify-center items-center">
        <KnowHub />
      </main>
      <Footer />
    </div>
  );
}

export default App;
