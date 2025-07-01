import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

const ViewApplication = () => {
  const { backendURL, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  //function to fetch company job applicants
  const fetchCompanyJobApplicants = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/company/applicants", {
        headers: { token: companyToken },
      });
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  //function to update job applications status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendURL + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        fetchCompanyJobApplicants();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplicants();
    }
  }, [companyToken]);
  return applicants ? (
    applicants.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh]"><p className="text-xl sm:text-2xl">No Applications Available</p></div>
    ) : (
      <div className="container mx-auto p-4">
        <div className="overflow-x-auto">
          <table className="w-full max-w-6xl bg-white border border-gray-200 text-sm sm:text-base">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">User Name</th>
                <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
                <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
                <th className="py-2 px-4 text-left">Resume</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => {
                  const isTopRow = index < 4;

                  return (
                    <tr key={index} className="text-gray-700">
                      <td className="py-2 px-4 border-b text-center  items-center">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border-b flex items-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full max-sm:hidden"
                          src={applicant.userId.image}
                          alt={`${applicant.name}'s profile`}
                        />
                        <span>{applicant.userId.name}</span>
                      </td>
                      <td className="py-2 px-4 border-b max-sm:hidden">
                        {applicant.jobId.title}
                      </td>
                      <td className="py-2 px-4 border-b max-sm:hidden">
                        {applicant.jobId.location}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <a
                          href={applicant.userId.resume}
                          target="_blank"
                          rel=""
                          className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex items-center gap-2"
                        >
                          Resume
                          <img
                            src={assets.resume_download_icon}
                            alt="Download"
                          />
                        </a>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {applicant.status === "Pending" ? (
                          <div className="relative inline-block text-left group">
                            <button className="cursor-pointer text-gray-500 px-2 py-1 rounded hover:bg-gray-100 transition duration-150">
                              ...
                            </button>
                            <div
                              className={`z-50 hidden group-hover:block absolute right-0 w-32 bg-white border border-gray-200 rounded shadow-lg overflow-visible ${
                                isTopRow ? "top-full mt-2" : "bottom-full mb-2"
                              }`}
                            >
                              <button
                                onClick={() =>
                                  changeJobApplicationStatus(
                                    applicant._id,
                                    "Accepted"
                                  )
                                }
                                className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  changeJobApplicationStatus(
                                    applicant._id,
                                    "Rejected"
                                  )
                                }
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>{applicant.status}</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading></Loading>
  );
};

export default ViewApplication;
