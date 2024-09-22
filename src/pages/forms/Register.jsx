import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/userSlice";

function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(userData));
    } catch (error) {
      console.error(error); // Handle errors appropriately
    }
  };

  return (
    <div className="container mx-auto max-w-sm p-4">
      <h1 className="text-2xl font-medium mb-4">Register</h1>
      <form onSubmit={handleSubmit}>
  <div className="form-input relative mb-4">
    <input
      type="text"
      id="username"
      name="username"
      value={userData.username}
      onChange={handleChange}
      required
      className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <label htmlFor="username">Username</label>
  </div>

  <div className="form-input relative mb-4">
    <input
      type="email"
      id="email"
      name="email"
      value={userData.email}
      onChange={handleChange}
      required
      className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <label htmlFor="email">Email</label>
  </div>

  <div className="form-input relative mb-4">
    <input
      type="password"
      id="password"
      name="password"
      value={userData.password}
      onChange={handleChange}
      required
      className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <label htmlFor="password">Password</label>
  </div>

  <button
    type="submit"
    className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    Register
  </button>
</form>

    </div>
  );
}

export default Register;
