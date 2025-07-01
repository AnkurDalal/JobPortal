import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const DashBoard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

  // Function to logout for the company
  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  useEffect(() => {
    const path = window.location.pathname;
    if (companyData && path === "/dashboard") {
      navigate("/dashboard/add-job"); // Set your default route here
    }
  }, [companyData, navigate]);

  return (
    <div className="min-h-screen">
      {/* NavBar */}
      <div className="shadow py-4 bg-white">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate("/")}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />
          {companyData && (
            <div className="flex items-center gap-3">
              <p className="max-sm:hidden font-medium">
                Welcome, {companyData.name}
              </p>
              <div className="relative group">
                <img
                  className="w-8 border rounded-full cursor-pointer"
                  src={companyData.image}
                  alt="User Icon"
                />
                <div className="absolute hidden group-hover:block top-10 right-0 z-10">
                  <ul className="bg-white rounded-md border text-sm shadow px-2 py-1">
                    <li
                      onClick={logout}
                      className="cursor-pointer py-1 px-2 hover:bg-gray-100"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Layout: Sidebar + Main */}
      <div className="flex items-start">
        {/* Sidebar */}
        <div className="inline-block min-h-screen border-r-2 w-56 bg-gray-50">
          <ul className="flex flex-col pt-5 text-gray-800">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 sm:px-6 w-full hover:bg-gray-100 ${
                  isActive
                    ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-medium"
                    : ""
                }`
              }
            >
              <img src={assets.add_icon} alt="Add Job" className="min-w-4" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 sm:px-6 w-full hover:bg-gray-100 ${
                  isActive
                    ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-medium"
                    : ""
                }`
              }
            >
              <img src={assets.home_icon} alt="Manage Jobs" className="min-w-4" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 sm:px-6 w-full hover:bg-gray-100 ${
                  isActive
                    ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-medium"
                    : ""
                }`
              }
            >
              <img
                src={assets.person_tick_icon}
                alt="View Applications"
                className="min-w-4"
              />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-full p-2 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
