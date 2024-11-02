import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import { customerSignUpApi } from '../Api/Api';
const SignUp = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError(null); 
    setSuccessMessage(null); 
    console.log(customerSignUpApi)
    try {
      const response = await axios.post(customerSignUpApi, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccessMessage('Signup successful!');
      console.log('Response:', response.data);
      
    } catch (err) {
      console.error('Error:', err.response.data);

      setError(err.response.data.details.join(', '));

    }
    setLoading(false);
  };

  return (
    <div className="flex items-center lg:pt-10 justify-center min-h-screen bg-gray-100">
      <div className="bg-white max-md:mx-5 shadow-md rounded-lg p-5 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2  border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {loading ? (
            <button className="w-full py-2 bg-gray-500 text-white rounded-md">Loading...</button>
          ) : (
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Sign Up
            </button>
          )}

          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="lg:flex justify-between lg:space-x-2">
          <button className="flex max-md:mb-3 items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <FaGoogle className="mr-2 text-red-500" />
            Sign in with Google
          </button>
          <button className="flex items-center justify-center w-full py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            <FaFacebook className="mr-2 text-blue-500" />
            Sign in with Facebook
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Have an account? <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>

    </div>
  );
};

export default SignUp;
