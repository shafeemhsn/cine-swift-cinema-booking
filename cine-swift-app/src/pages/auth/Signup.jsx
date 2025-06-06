// src/pages/auth/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/authContext';
// import logo from '@/assets/logo.png';

export default function Signup() {
  // const { register } = useAuth();

   const register = () =>{

    }
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register(firstName, lastName, email, password);
      navigate('/home', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="flex min-h-screen items-center justify-center bg-[#E5EDF1]">
  <div className="w-full max-w-sm shadow-xl bg-white rounded-lg p-8">
    <h1 className="text-2xl font-bold text-center mb-6 text-[#1A4158]">
      Create Account
    </h1>

    {error && (
      <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm font-medium">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* First Name */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          First Name
        </label>
        <input
          type="text"
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1A4158]"
          placeholder="Jane"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Last Name
        </label>
        <input
          type="text"
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1A4158]"
          placeholder="Doe"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1A4158]"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1A4158]"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1A4158]"
          placeholder="••••••••"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`w-full py-2 rounded font-medium text-white bg-yellow-400 hover:bg-yellow-500 transition ${
          loading && 'opacity-50 cursor-not-allowed'
        }`}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner mr-2" />
            Creating account…
          </>
        ) : (
          'Sign up'
        )}
      </button>
    </form>

    <p className="text-center mt-4 text-sm text-gray-600">
      Already have an account?{' '}
      <a href="/" className="text-yellow-500 hover:underline">
        Log in
      </a>
    </p>
  </div>
</div>

  );
}
