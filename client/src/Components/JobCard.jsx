import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  

  return (
    <div className="border p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <img src={assets.company_icon} alt="Company logo" className="h-10 w-10" />
      </div>

      <h4 className="font-medium text-xl mt-4 text-gray-800">{job.title}</h4>

      <div className="flex items-center gap-3 mt-3 text-xs font-medium text-gray-700">
        <span className="bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">{job.location}</span>
        <span className="bg-red-50 border border-red-200 px-4 py-1.5 rounded">{job.level}</span>
      </div>

      <p
        className="text-gray-600 text-sm mt-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) + '...' }}
      ></p>

      <div className="mt-5 flex gap-4 text-sm">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded"
        >
          Apply Now
        </button>

        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="text-gray-600 border border-gray-400 hover:bg-gray-100 transition px-5 py-2 rounded"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
