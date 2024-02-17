import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loader from "./Loader";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., validate credentials, make API call)
    try {
      setLoading(true);
      // const response = await fetch("http://localhost:8080/login", {
        const response = await fetch("https://solarmed.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      // console.log(data);
      console.log(data);
      if (!data || response.status === 400) {
        alert("Invalid credentials");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userRole", data.userRole);
        alert("Login successful");
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form method="POST">
          <div className="mb-4 flex gap-2 items-center">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium text-2xl"
            >
              <MdOutlineEmail />
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#5b9daf]"
              required
            />
          </div>
          <div className="mb-4 flex gap-2 items-center">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium text-2xl"
            >
              <TbPasswordFingerprint />
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#4d9db3]"
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#4598af] text-white py-2 px-4 rounded-md hover:bg-[#1c748a] focus:outline-none focus:bg-[#1c748a]"
          >
            Log In
          </button>
          {loading && (
            <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
              <Loader />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default Login;
