import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/mainLayout/Navbar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-700 text-white">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
