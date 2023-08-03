// import React from 'react';
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const BuyPixel = () => {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
   
    console.log("Purchased!",name,email,address,city,state);
  };
  const { user } = useContext(AuthContext);
  console.log(user.email);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300 rounded-md py-2 px-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 rounded-md py-2 px-4"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-gray-300 rounded-md py-2 px-4"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-gray-300 rounded-md py-2 px-4"
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border-gray-300 rounded-md py-2 px-4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Purchase
        </button>
      </form>
    </div>
  );
};

export default BuyPixel;
