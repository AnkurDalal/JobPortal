import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const { setShowRecruiterLogin } = useContext(AppContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (state === "Sign Up") {
      if (!isTextDataSubmitted) {
        setIsTextDataSubmitted(true); // Step 1: move to image upload
        return;
      } else {
        // Step 2: Simulate account creation
        alert("Account created successfully!");
        setShowRecruiterLogin(false);
      }
    } else {
      // Login simulation
      alert("Login successful!");
      setShowRecruiterLogin(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-[90%] max-w-md"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm text-center mb-4">
          Welcome back! Please sign in to continue
        </p>

        {/* Sign Up - Step 2: Image Upload */}
        {state === "Sign Up" && isTextDataSubmitted ? (
          <div className="flex flex-col items-center gap-4 my-6">
            <label htmlFor="image" className="cursor-pointer text-center">
              <img
                className="w-16 h-16 object-cover rounded-full mx-auto"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload"
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
              <p className="mt-2 text-sm text-gray-600">Upload Company Logo</p>
            </label>
          </div>
        ) : (
          <>
            {/* Sign Up - Step 1: Text Inputs */}
            {state !== "Login" && (
              <div className="border px-4 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                  className="outline-none text-sm w-full"
                />
              </div>
            )}

            <div className="border px-4 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="E-mail id"
                required
                className="outline-none text-sm w-full"
              />
            </div>

            <div className="border px-4 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="outline-none text-sm w-full"
              />
            </div>
          </>
        )}

        {/* Forgot Password for Login */}
        {state === "Login" && (
          <p className="text-sm text-blue-600 mt-4 cursor-pointer">
            Forgot Password
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-6"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        {/* Toggle Login/SignUp */}
        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setState("Sign Up");
                setIsTextDataSubmitted(false);
              }}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                setState("Login");
                setIsTextDataSubmitted(false);
              }}
            >
              Login
            </span>
          </p>
        )}

        {/* Close Button */}
        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 cursor-pointer w-4"
          src={assets.cross_icon}
          alt="Close"
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
