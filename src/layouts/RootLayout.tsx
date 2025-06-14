import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface RootLayoutProps {
  resetFeedingStatus: () => void;
}

const RootLayout = ({ resetFeedingStatus }: RootLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto p-4 flex-grow">
        <Outlet />
      </main>

      <Footer resetFeedingStatus={resetFeedingStatus} />
    </div>
  );
};

export default RootLayout;
