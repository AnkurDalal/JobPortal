import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="w-full border-t mt-20 py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 2xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <img width={160} src={assets.logo} alt="Company Logo" />

        {/* Copyright Text */}
        <p className="text-sm text-gray-500 text-center sm:text-left">
          © {new Date().getFullYear()} ankurdalal121@ | All rights reserved
        </p>

        {/* Social Icons */}
        <div className="flex gap-3">
          <a href="#" aria-label="Facebook">
            <img width={30} src={assets.facebook_icon} alt="Facebook" />
          </a>
          <a href="#" aria-label="Twitter">
            <img width={30} src={assets.twitter_icon} alt="Twitter" />
          </a>
          <a href="#" aria-label="Instagram">
            <img width={30} src={assets.instagram_icon} alt="Instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
