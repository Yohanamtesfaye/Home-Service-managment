import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

import ServiceDescription from "../Components/ServiceDescription";
import ServiceTypes from "../Components/ServiceTypes";
import ServiceSelector from "../Components/ServiceSelector";

import TechnicianCarousel from "../UIComponents/TechnicianCarousel";
import Testimonials from "../UIComponents/Testimonials";
import FAQ from "../UIComponents/FAQ";
import Contact from "../../Customer/Pages/ContactUs";

// import home from "../../assets/home.png";
import WhyWe from "../Components/WhyWe";
import { API_URL } from "../api";
import LoadingPage from "../Components/LoadingPage";

const Landing = () => {
  const { t} = useTranslation();
  const [loading , setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch services from the backend
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/services`);
      if (response.data) {
        setServices(response.data);
        setLoading(false);
        console.log(response.data);
        setSelectedService(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  // Extracting service names and IDs from each service object to display in the dropdown
const servicesArray = services.map(service => {
  return service.services.map(subService => ({
    id: subService.serviceId,
    name: subService.name,
  }));
}).flat(); // Flattening the nested arrays into a single array
console.log(servicesArray, "servicesArray");

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle search submission



  
  const sendSearchToBackend = async (query) => {
    if (!query) return;
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) throw new Error("Search query failed");
    } catch (error) {
      console.error("Error sending search query:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  
    // Only filter services if searchText is not empty
    if (e.target.value) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };
  const filteredServices = servicesArray.filter(service => {
    const serviceName = service.name || ""; // Use an empty string if name is undefined
    return serviceName.toLowerCase().includes(searchText.toLowerCase());
  });
  
  

  // Select service handler
  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };
  console.log(services, "services"); ;
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="w-full bg-white text-black">
        <div className="flex flex-col justify-center items-center px-8 lg:px-0 lg:pt-44 pt-36 pb-8">
          <h1 className="max-md:text-3xl lg:text-5xl font-extrabold leading-tight mb-16 text-center">
            {t('every_service')}
          </h1>
          {/* <p className="text-lg text-gray-600 mb-4 text-center">
            {t("header")}
          </p> */}
          {/* <p className="text-sm text-gray-500 mb-6 text-center">{t("which")}</p> */}

          {/* Search Dropdown */}
          <div className="lg:w-1/2 w-72">
      <div className="relative">
        <div className="flex items-center bg-gray-100 text-gray-700 rounded-full shadow-md">
          <input
            type="text"
            placeholder={t("search_services")}
            value={searchText}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            className="flex-grow outline-none font-light bg-transparent placeholder-gray-700 max-md:text-sm lg:text-lg md:py-3 px-5"
          />
          <div 
            className="bg-green-800 hover:bg-green-700 rounded-r-full md:p-5 max-md:py-3 md:px-8 max-md:px-4 cursor-pointer flex items-center justify-center"
            onClick={() => sendSearchToBackend(searchText)}
          >
            <FiSearch
              size={20}
              className="cursor-pointer text-white"
            />
          </div>
        </div>

        {/* Dropdown Suggestions */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white border text-black py-4 border-gray-200 rounded-md shadow-lg mt-2 z-20 max-h-60 overflow-y-auto">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/technician-list/${service.id}`}
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {service.name}
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
            <div className="flex justify-center mb-8">
              {t('become_tech')}?
            <Link to="/technician-registration" onClick={() => setIsOpen(false)} className="text-green-800 px-3 hover:text-green-800 hover:underline">
              {t('applay_now')}
          </Link>
            </div>
        {/* Service Section */}
        <div className=" pb-8 container lg:mx-auto  lg:px-32 ">
          <div className="container ">
            {selectedService && (
              <>
                <ServiceSelector
                  services={services}
                  selectedService={selectedService}
                  onSelect={handleServiceSelect}
                />
                <hr className="border border-b-gray-400 mb-6 " />
                <ServiceTypes types={[selectedService.services]} />
                <ServiceDescription
                  title={selectedService.categoryName}
                  description={selectedService.description}
                  
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why We Section */}
      <section className="py-12 bg-white">
        <div className="container lg:mx-auto  lg:px-32">
          <WhyWe />
        </div>
      </section>

      {/* Technicians Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-32">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {t("our_top_technicians")}
          </h2>
          <TechnicianCarousel />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 lg:px-32">
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('testmony')}
            </h2>
            <p className="text-gray-600 mx-auto">
              {t('testimonialSubtitle')}
            </p>
          <Testimonials />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-32">
          <FAQ />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto  lg:px-32">
          <Contact />
        </div>
      </section>
    </div>
  );
};

export default Landing;
