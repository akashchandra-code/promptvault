import Navbar from "./components/Navbar";
import MainRoute from "./routes/MainRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../src/components/Footer';
import ScrollToTop from "./components/ScrollToTop";
const App = () => {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white text-gray-900">
      {/* Fixed Navbar */}
      <Navbar />
      <ScrollToTop />

      {/* Main Content */}
      <main className=" px-[1rem] lg:px-[3rem]  ">
        <MainRoute />
      </main>

      <Footer />

      {/* Toast */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
