import axios from "axios";
import React, { useState } from "react";
import { getCookie } from "../lib/cookieGetterSetter";

const Form = () => {
  const cookie = getCookie("storedAuthtoken");
  // console.log(cookie);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      const data = axios.post("/issueComplain", 
        formData,{ headers: {
          "auth-token": cookie,
        }}
      
        
      );
      alert("Ready to file complain?");
      window.location.href = "/home"; //Redirect me to the homepage.
    } else {
      alert("Please fill out both title and description before submitting.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-purple-300 to-pink-300 p-8">
      <div className="bg-purple-600 p-8 rounded-lg shadow-lg flex flex-col items-center w-4/5">
        <div className="w-full mb-8">{/* Inner card content */}</div>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white p-6 rounded-lg mb-4 w-full">
            <h2 className="text-2xl font-bold mb-4">Complain Form</h2>
            {/* Add login form components here */}
            <form className="flex flex-col">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="border rounded px-3 py-2 w-full"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter your title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description:
                </label>
                <textarea
                  className="border rounded px-3 py-2 w-full"
                  id="description"
                  name="description"
                  placeholder="Enter your description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                className="bg-purple-800 text-white px-4 py-2 rounded-full hover:bg-purple-700"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
