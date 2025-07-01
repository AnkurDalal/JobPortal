import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendURL, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const description = quillRef.current.root.innerHTML;
      const { data } = await axios.post(
        backendURL + "/api/company/post-job",
        { title, description, location, salary, category, level },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className="container px-4 py-6 flex flex-col w-full items-start gap-4 mx-auto"
      >
        {/* Job Title */}
        <div className="w-full max-w-2xl">
          <p className="mb-2 font-medium">Job Title</p>
          <input
            type="text"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            className="w-full px-3 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        {/* Job Description */}
        <div className="w-full max-w-2xl">
          <p className="my-2 font-medium">Job Description</p>
          <div
            ref={editorRef}
            className="bg-white border-2 border-gray-300 rounded min-h-[150px] p-2"
          />
        </div>

        {/* Category, Location, Level */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full max-w-2xl">
          <div className="flex-1 min-w-[150px]">
            <p className="mb-2 font-medium">Job Category</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {JobCategories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <p className="mb-2 font-medium">Job Location</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            >
              {JobLocations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <p className="mb-2 font-medium">Job Level</p>
            <select
              className="w-full px-3 py-2 border-2 border-gray-300 rounded"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            >
              <option value="Beginner Level">Beginner Level</option>
              <option value="Intermediate Level">Intermediate Level</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </div>
        </div>

        {/* Salary */}
        <div className="w-full max-w-2xl">
          <p className="mb-2 font-medium">Job Salary</p>
          <input
            min={0}
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="2500"
            className="w-full sm:w-[150px] px-3 py-2 border-2 border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-28 py-3 mt-4 bg-black text-white rounded hover:bg-gray-800"
        >
          ADD
        </button>
      </form>
    </>
  );
};

export default AddJob;
