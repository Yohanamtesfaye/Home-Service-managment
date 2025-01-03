import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaUserCircle, FaBell, FaBars, FaTimes } from "react-icons/fa";
import logo1 from "../../assets/logo1.png";

export default function CustomerNavBar() {
  const { i18n,t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const Customer = JSON.parse(localStorage.getItem("customer") || "{}");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const profileLink = `/customer-profile/${Customer?.id || ""}`;
  const notificationLink = `/notification/${user?.id || ""}`;

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "am" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="text-black bg-white shadow-lg fixed top-0 left-0 right-0 z-50 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo1} alt="Logo" className="h-14" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            
            <Link
              to={profileLink}
              className="text-2xl text-green-800 hover:text-green-600 transition duration-150 ease-in-out px-4"
              aria-label="Profile"
            >
              <FaUserCircle size={32} />
            </Link>
            <Link
              to={notificationLink}
              className="text-2xl text-green-800 hover:text-green-600 transition duration-150 ease-in-out"
              aria-label="Notifications"
            >
              <FaBell size={32} />
            </Link>
          
                {/* Language Selector */}
              <select
                 onChange={(e) => i18n.changeLanguage(e.target.value)}
                 value={i18n.language}
                 className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-full 
                   hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 
                 focus:border-transparent transition-colors duration-200">
                  <option value="en">English</option>
                  <option value="am">አማርኛ</option>
              </select>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black focus:outline-none"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <Link
              to={profileLink}
              className="block text-black px-3 py-2 rounded-md text-base font-medium hover:text-green-800 transition duration-150 ease-in-out"
            >
              Profile
            </Link>
            <Link
              to={notificationLink}
              className="block text-black px-3 py-2 rounded-md text-base font-medium hover:text-green-800 transition duration-150 ease-in-out"
            >
              Notifications
            </Link>
            <button
              onClick={toggleLanguage}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:text-green-800 transition duration-150 ease-in-out"
            >
              {i18n.language === "en" ? "Switch to Amharic" : "Switch to English"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
