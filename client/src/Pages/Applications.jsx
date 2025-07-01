import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { assets } from "../assets/assets";
import moment from "moment";
import Footer from "../Components/Footer";
import { AppContext } from "../Context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    backendURL,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();

      const { data } = await axios.post(
        backendURL + "/api/users/update-resume",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  const userApplicationsSafe = userApplications || [];

  return (
    <>
      <NavBar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        {/* Resume Upload Section */}
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-6 mt-3">
          {isEdit || (userData && userData.resume === "") ? (
            <>
              <label
                htmlFor="resumeUpload"
                className="flex items-center cursor-pointer"
              >
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : "Upload Resume"}
                </p>
                <input
                  id="resumeUpload"
                  accept="application/pdf"
                  type="file"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
                <img src={assets.profile_upload_icon} alt="Upload Icon" />
              </label>
              <button
                onClick={updateResume}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2"
              >
                Save
              </button>
            </>
          ) : userData?.resume ? (
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-center"
                href={userData.resume}
                target="_blank"
                download
              >
                {resume ? resume.name : "Resume.pdf"}
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          ) : (
            <p className="text-gray-500">No resume uploaded</p>
          )}
        </div>

        {/* Job Applications Section */}
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>

        {/* Desktop Table View */}
        <div className="overflow-x-auto hidden sm:block">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-left">Company</th>
                <th className="py-3 px-4 border-b text-left">Job Title</th>
                <th className="py-3 px-4 border-b text-left">Location</th>
                <th className="py-3 px-4 border-b text-left">Date</th>
                <th className="py-3 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplicationsSafe.map((job, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 flex items-center gap-2 border-b">
                    <img
                      className="w-8 h-8"
                      src={job.companyId?.image}
                      alt="logo"
                    />
                    {job.companyId?.name}
                  </td>
                  <td className="py-2 px-4 border-b">{job.jobId?.title}</td>
                  <td className="py-2 px-4 border-b">{job.jobId?.location}</td>
                  <td className="py-2 px-4 border-b">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-4 py-1.5 rounded font-medium text-sm ${
                        job.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : job.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden flex flex-col gap-4">
          {userApplicationsSafe.map((job, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  className="w-8 h-8"
                  src={job.companyId?.image}
                  alt="logo"
                />
                <span className="font-medium">{job.companyId?.name}</span>
              </div>
              <p className="text-sm mb-1">
                <strong>Title:</strong> {job.jobId?.title}
              </p>
              <p className="text-sm mb-1">
                <strong>Location:</strong> {job.jobId?.location}
              </p>
              <p className="text-sm mb-1">
                <strong>Date:</strong> {moment(job.date).format("ll")}
              </p>
              <span
                className={`inline-block px-4 py-1.5 mt-2 rounded font-medium text-sm ${
                  job.status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : job.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {job.status}
              </span>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Applications;
