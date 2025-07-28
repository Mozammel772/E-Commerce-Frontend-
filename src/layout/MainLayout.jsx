import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-grow ">
        <div className="max-w-7xl mx-auto px-2 mt-5 py-2">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
