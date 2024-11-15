import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with', { email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r  to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">Remember me</label>
            </div>
            <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
          >
            Log In
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-indigo-600 hover:text-indigo-500">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
