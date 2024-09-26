import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                email: email,
                password: password
            }),
        });

        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
            // Ensure tokens are set correctly in localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            // console.log('Tokens set in localStorage:', {
            //     accessToken: localStorage.getItem('accessToken'),
            //     refreshToken: localStorage.getItem('refreshToken'),
            // });

            
            setMessage('Login successful');
            setMessageType('success');

            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 1500);
        } else {
            setMessage(data.message || 'Login failed');
            setMessageType('error');
        }
    } catch (error) {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
        setMessageType('error');
    }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col h-[70vh] lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-gray-800">
          <img className="coverimg" src="../../public/login.jpg" alt="Cover Image" />
        </div>

        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-[24px] text-[#1e3a8a] mb-4">Welcome Back</h1>
          <p className="text-gray-600 mb-8">
            Login to check the exciting offers in your account
          </p>

          {message && <p className="text-red-500 mb-4">{message}</p>}

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-4 top-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {/* Placeholder for eye icon */}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <a href="signup" className="text-blue-500">SignUp</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
