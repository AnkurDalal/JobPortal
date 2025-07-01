import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(false);
  const { backendURL, companyToken } = useContext(AppContext);

  // Fetch jobs
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Change visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  if (!jobs) return <Loading />;

  if (jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Jobs Available or Posted</p>
      </div>
    );
  }

  return (
    <div className="container p-4 max-w-5xl mx-auto">
      {/* Table for Desktop */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full bg-white border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Location</th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b">{moment(job.date).format("ll")}</td>
                <td className="py-2 px-4 border-b">{job.location}</td>
                <td className="py-2 px-4 border-b text-center">{job.applicants}</td>
                <td className="py-2 px-4 border-b">
                  <input
                    onChange={() => changeJobVisibility(job._id)}
                    className="scale-125 ml-4"
                    type="checkbox"
                    checked={job.visible}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for Mobile */}
      <div className="sm:hidden flex flex-col gap-4">
        {jobs.map((job, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
            <p className="font-semibold text-lg mb-1">{job.title}</p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Date:</strong> {moment(job.date).format("ll")}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Applicants:</strong> {job.applicants}
            </p>
            <div className="flex items-center mt-2">
              <input
                onChange={() => changeJobVisibility(job._id)}
                className="scale-125 mr-2"
                type="checkbox"
                checked={job.visible}
              />
              <span className="text-sm">Visible</span>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
