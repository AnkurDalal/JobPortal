import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const DashBoard = () => {
  const navigate = useNavigate();

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
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden font-medium">Welcome To Insider Jobs</p>
            <div className="relative group">
              <img
                className="w-8 border rounded-full cursor-pointer"
                src={assets.company_icon}
                alt="User Icon"
              />
              <div className="absolute hidden group-hover:block top-10 right-0 z-10">
                <ul className="bg-white rounded-md border text-sm shadow px-2 py-1">
                  <li className="cursor-pointer py-1 px-2 hover:bg-gray-100">Logout</li>
                </ul>
              </div>
            </div>
          </div>
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
                  isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-medium" : ""
                }`
              }
            >
              <img  src={assets.add_icon} alt="Add Job" className="min-w-4" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 sm:px-6 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-medium" : ""
                }`
              }
            >
              <img src={assets.home_icon} alt="Manage Jobs" className="min-w-4"  />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 sm:px-6 w-full hover:bg-gray-100 ${
                  isActive ? "bg-blue-100 border-r-4 border-blue-500 text-blue-700 font-medium" : ""
                }`
              }
            >
              <img src={assets.person_tick_icon} alt="View Applications" className="min-w-4"  />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
