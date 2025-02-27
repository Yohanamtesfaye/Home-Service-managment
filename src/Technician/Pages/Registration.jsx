import React, { useContext, useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { technicianSignUpApi } from '../Api/Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Shared/api';
import { useTranslation } from 'react-i18next';
import cleanImage from '../../assets//house_clean.png';
import { LanguageContext } from '../../Shared/Context/LanguageContext';


function Registration() {
  const { t,i18n } = useTranslation();
  const isAmharic = i18n.language === "am";
  const [error, setError] = useState(null);
  const [subcity, setSubcity] = useState([]);
  const [files, setFiles] = useState({
    documents: null,
    idCardImage: null,
    profileImage: null,
  });
  const [services, setService] = useState([]);
  const {language} = useContext(LanguageContext)
  const fetchdistrict = async () => {
    
    try {
      const response = await axios.get(`${API_URL}/districts?lang=${language}`);
      if (response.data) {
        setSubcity(response.data);
    
        console.log(response.data);
       
        //  setSelectedServiceContext(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  console.log(subcity)
  useEffect(()=>{
    fetchdistrict();
  },[])
 console.log(subcity)
  const subCities = [
    { id: 1, name: "Bole" },
    { id: 2, name: "Kality" },
    { id: 3, name: "Kirkos" },
  ];

  const weredas = [
    { id: 1, name: "Wereda 1" },
    { id: 2, name: "Wereda 2" },
    { id: 3, name: "Wereda 3" },
  ];

  const navigate = useNavigate();

  // srevice part
  const [selectedServices, setSelectedServices] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCheckboxChange = (value) => {
    // setSelectedOptions((prev) =>
    //   prev.includes(value)
    //     ? prev.filter((item) => item !== value)
    //     : [...prev, value]
    // );
    const selectedValue = value;
    const isAlreadySelected = selectedServices.some(service => service.id === parseInt(selectedValue));

    if (!isAlreadySelected && selectedValue) {
      const selectedService = services.find(service => service.id === parseInt(selectedValue));
      setSelectedServices([...selectedServices, selectedService]);
    }
  };

  const handleRemoveService = (id) => {
    setSelectedServices(selectedServices.filter(service => service.id !== id));
  };
 
     // uploaded file part

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }));
      console.log("Selected file:", file.name);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    // validating the input data

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    bio: '',
    password: '',
    confirm_password: '',
  });


  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
  
    // Check for empty fields
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (/\d/.test(formData.name)) {  
      newErrors.name = "Name cannot contain numbers.";
    }
  
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
  
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "PhoneNumber number is required.";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a 10-digit phoneNumber number.";
    }
  
    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required.";
    }
  
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match.";
    }
  
    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!validate()){
      return;
    }
    const formDatas = new FormData();
    console.log(formData);
    console.log(files);
    Object.keys(formData).forEach(key => {
      formDatas.append(key, formData[key]);
    });
    selectedServices.forEach(service => {
      formDatas.append('serviceIds', service.id);
    });
    Object.keys(files).forEach(key => {
      if (files[key]) formDatas.append(key, files[key]);
    });

    try {
      const response = await axios.post(technicianSignUpApi, formDatas, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      
      console.log('Response:', response.data);
      navigate('/tech-verification-waiting');
    } catch (err) {
      setError(err.response.data.details.join('\n'));

      err.response != undefined ? console.error('Error:', err.response.data) : console.error('Error:', err);
    }

  };

  const fetch = async ()=>{
    try {
      const res =await axios.get(`${API_URL}/services`);
      console.log(res.data)
      setService(res.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetch()
  }
  , []);

  return (
   <div
         className="min-h-screen flex items-cente justify-center px-4 bg-cover bg-center"
         style={{
           backgroundImage: `url(${cleanImage})`,
           backgroundColor: "rgba(255, 255, 255, 0.9)",
           backgroundBlend: "overlay",
         }}
       >
      <div className="flex flex-col md:flex-row mx-4 md:mx-44 mt-16  max-md:my-12 rounded-lg lg:shadow-lg lg:shadow-gray-400 px-8 lg:px-0  ">
        {/* Left part*/}
        <div className=" w-full lg:p-8 px-12 py-8 my-12 bg-white rounded-xl">
        <h2 className="text-5xl font-bold text-center text-emerald-800 mb-8">huluMoya</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

            {/*  name part */}

            <div>
              <label className={`block ${isAmharic ? "text-xl" : "text-md"} font-medium text-gray-700`}>{t('name')}<span className='text-red-500 text-sm'>*</span></label>
              <input type="text" name="name" placeholder={t('enter_name')} value={formData.name} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}         
            </div>

             {/*  email part */}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label  className={`block ${isAmharic ? "text-xl" : "text-md"} font-medium text-gray-700`}>{t('email')} <span className='text-red-500 text-sm'>*</span></label>
                <input type="email" name="email" placeholder={t('enter_email')} value={formData.email} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

               {/*  phoneNumber part */}

              <div className="flex-1">
                <label  className={`block ${isAmharic ? "text-xl" : "text-md"} font-medium text-gray-700`}>{t('phone')} <span className='text-red-500 text-sm'>*</span></label>
                <input type="tel" name="phoneNumber" placeholder={t('enter_phone')} value={formData.phoneNumber} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}              
              </div>
            </div>
                 
                  {/*  bio part */}
            <div>
              <label  className={`block ${isAmharic ? "text-xl" : "text-md"} font-medium text-gray-700`}>{t('bio')} <span className='text-red-500 text-sm'>*</span></label>
              <textarea name="bio" placeholder={t('bio')} value={formData.bio} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none h-20" required></textarea>
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
            </div>

            {/* Service part */}
           <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                  {/* Custom Select Button */}
                  <div
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      width: "100%",
                      background: "#fff",
                      borderRadius: "4px",
                      marginBottom: "10px",
                    }}
                  >
                    {selectedServices.length > 0
                      ?  t('select_service'): t('select_service')}
                  </div>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "100%",
                        maxHeight: "150px",
                        overflowY: "auto",
                        background: "#fff",
                        border: "1px solid #ccc",
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                        zIndex: 1,
                        borderRadius: "4px",
                      }}
                    >
                      {services.map((service) => (
                        <label
                          key={service.id}
                          style={{
                            display: "block",
                            padding: "10px",
                            borderBottom: "1px solid #eee",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="checkbox"
                            value={service.id}
                            checked={selectedServices.some(
                              (selectedService) => selectedService.id === service.id
                            )}
                            onChange={() => handleCheckboxChange(service.id)}
                            style={{ marginRight: "10px" }}
                          />
                          {service.name}
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Selected Services */}
                  {selectedServices.length > 0 && (
  <div
    style={{
      marginTop: "10px",
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    }}
  >
    {selectedServices.map((service) => (
      <div
        key={service.id}
        style={{
          display: "flex",
          alignItems: "center",
          background: "#f1f1f1",
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "14px",
          color: "#333",
        }}
      >
        <span>{service.name}</span>
        <button
          onClick={() => handleRemoveService(service.id)}
          style={{
            marginLeft: "8px",
            background: "none",
            border: "none",
            color: "#666",
            cursor: "pointer",
            fontSize: "14px",
            padding: "0",
          }}
        >
          ×
        </button>
      </div>
    ))}
  </div>
)}
                  
                </div>

            {/* Address part */}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label  className={`block ${isAmharic ? "text-xl" : "text-md"} font-medium text-gray-700`}>{t('subcity')} <span className='text-red-500 text-sm'>*</span></label>
                <select name="subcity" className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required>
                  <option value="">{t('select_subcity')}</option>
                  {subCities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label  className={`block ${isAmharic ? "text-xl" : "text-md"} font-medium text-gray-700`}>{t('woreda')} <span className='text-red-500 text-sm'>*</span></label>
                <select name="wereda" className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required>
                  <option value="">{t('select_woreda')}</option>
                  {weredas.map(wereda => (
                    <option key={wereda.id} value={wereda.id}>{wereda.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* File part */}

            <div className="flex flex-col gap-4">
                  {['documents', 'idCardImage', 'profileImage'].map((type) => (
                    <div key={type} className="flex flex-col items-start space-y-2">
                      <label className={`${isAmharic ? "text-xl" : "text-md"} block  font-medium text-gray-700 capitalize`}>
                        {type === 'documents' ? t('cv') : type === 'idCardImage' ? t('id_card') : t('profile')}
                      </label>
                      <input
                        type="file"
                        onChange={(e) => handleFileChange(e, type)}
                        className="hidden"
                        id={type}
                      />
                      <label
                        htmlFor={type}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 cursor-pointer"
                      >
                        <FaUpload className="mr-2 text-gray-600" />
                        <span>{t('upload')}</span>
                      </label>
                      {files[type] && (
                        <span className="text-gray-600 text-sm">
                          Selected file: {files[type].name}
                        </span>
                      )}
                    </div>
                  ))}
            </div>

            {/* Password part */}

            <div className="flex flex-col md:flex-row gap-4 pb-6">
              <div className="flex-1">
                <label  className={`block ${isAmharic ? "text-xl" : "text-md"} font-medium text-gray-700`}>{t('password')} <span className='text-red-500 text-sm'>*</span></label>
                <input type="password" name="password" placeholder={t('enter_password')} value={formData.password} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
              </div>

               {/*  confirm part */}

              <div className="flex-1">
                <label  className={`block ${isAmharic ? "text-xl" : "text-md"} font-medium text-gray-700`}>{t('confirm_password')} <span className='text-red-500 text-sm'>*</span></label>
                <input type="password" name="confirm_password" placeholder={t('confirm_password')} value={formData.confirm_password} onChange={handleInputChange} className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:outline-none" required />
                {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password}</p>}
                </div>
            </div>

            {/* Submit Button part */}
            <button type="submit" className={` ${isAmharic ? "text-xl" : "text-md"} w-full bg-emerald-700 text-white py-3 mt-6 rounded-full hover:bg-emerald-600 focus:outline-none`}>
            {t('regis')}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>

       
   </div>
    </div>
  );
}

export default Registration;
