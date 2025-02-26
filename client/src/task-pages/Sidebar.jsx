import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart2,
  Layers,
  ReceiptIcon,
  Archive,
  FileText,
  Users,
  ShoppingCart,
  LogOut, // Import the LogOut icon from lucide-react
} from "lucide-react";
import { GlobalContext } from "../Context/context"; // Adjust the import path as needed

export default function Sidebar() {
  const { dispatch } = useContext(GlobalContext); // Access the dispatch function
  const navigate = useNavigate(); // Hook for navigation

  // Handle logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch the logout action
    navigate("/sign"); // Redirect to the sign-in page
  };

  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto bg-slate-900 px-5 py-8 fixed">
      <div className="mt-16 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-8">
          <div className="space-y-12">
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/user"
            >
              <FileText className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">user</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/vehicle"
            >
              <Archive className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">vehicle</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/policy"
            >
              <Layers className="h-5 w-5" aria-hidden="true" />
              <span className="mx-4 text-sm font-medium">Policy</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/premium"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">premium</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-5 py-5 text-white transition-colors duration-300 hover:bg-red-100 hover:text-red-700"
              href="/history"
            >
              <ReceiptIcon className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-large">GET REPORT</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-5 py-5 text-white transition-colors duration-300 hover:bg-red-100 hover:text-red-700"
              href="/insig"
            >
              <ReceiptIcon className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-large">GET Insights</span>
            </a>
          </div>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex transform items-center rounded-lg px-3 py-2 text-white transition-colors duration-300 hover:bg-red-100 hover:text-red-700"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          <span className="mx-2 text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}