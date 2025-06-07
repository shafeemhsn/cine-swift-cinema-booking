// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(`Invalid credentials ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E5EDF1]">
      <div className="w-full max-w-sm shadow-xl bg-white rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#1A4158]">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1A4158]"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded font-medium text-white bg-[#1A4158] hover:bg-[#25516A] transition ${
              loading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner mr-2" />
                Logging in…
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <a className="text-yellow-500 hover:underline" href="/signup">
            Sign up!
          </a>
        </div>
      </div>
    </div>
  );
}
