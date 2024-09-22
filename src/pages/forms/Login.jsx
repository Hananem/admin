import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlice'; // Import the login action creator
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const credentials = { email, password };
      await dispatch(loginUser(credentials)); // Dispatch login action
      navigate('/'); // Navigate to home page after successful login
    } catch (error) {
      console.error(error); // Handle errors appropriately (e.g., display error message)
    }
  };
  return (
    <div className="container mx-auto max-w-sm p-4">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
  <div className="form-input relative mb-4">
    <input
      type="email"
      id="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
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
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="input w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <label htmlFor="password">Password</label>
  </div>

  <button
    type="submit"
    className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    Login
  </button>
</form>

    </div>
  );
}

export default Login;