import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to access state
import Sidebar from "./Sidebar.jsx";

export default function PagenotFound() {
  const location = useLocation(); // Access the location object
  const error = location.state?.error; // Extract the error from state

  return (
    <>
      <Sidebar />
      <div
        className="flex items-center justify-center h-screen"
        style={{ marginTop: "70px", marginLeft: "280px" }}
      >
        <div className="text-center">
          <p className="text-base font-semibold text-red-900">404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl text-red-900">
            Page not found
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>

          {/* Display the error message if it exists */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-semibold">Error Details:</p>
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-4 flex items-center justify-center gap-x-3"></div>
        </div>
      </div>
    </>
  );
}