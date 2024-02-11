
import { FaUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: ''
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]: value})
  }
  const signupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://solarmed.onrender.com/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...user }),
      });
      const data = await response.json();

      if (!data || response.status === 400) {
        alert("Invalid credentials");
      } else {
        alert("Registration successful");
        navigate("/login");
      }
    } catch (err) {
      alert(err);
    }
  }
  return (
<div className="pt-10 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form method="POST">
          <div className="mb-4 flex items-center gap-2">
            <label htmlFor="name" className="block text-gray-700 font-medium text-xl">
             <FaUser />
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={user.name}
              onChange={handleInput}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#4d9db3]"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label htmlFor="email" className="block text-gray-700 font-medium text-2xl">
              <MdOutlineEmail />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              value={user.email}
              onChange={handleInput}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#4d9db3]"
            />
            </div>
            <div className="mb-4 flex items-center gap-2">
            <label htmlFor="phone" className="block text-gray-700 font-medium text-xl">
              <FaPhone />
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              value={user.phone}
              onChange={handleInput}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#4d9db3]"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label htmlFor="work" className="block text-gray-700 font-medium text-2xl">
              <MdWork />
            </label>
            <input
              type="text"
              name="work"
              id="work"
              placeholder="Occupation"
              value={user.work}
              onChange={handleInput}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#4d9db3]"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label htmlFor="password" className="block text-gray-700 font-medium text-2xl">
              <TbPasswordFingerprint />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInput}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#4d9db3]"
            />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium text-2xl">
              <TbPasswordFingerprint />
            </label>
            <input
              type="password"
              name="cpassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={user.cpassword}
              onChange={handleInput}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-[#4d9db3]"
            />
          </div>
          <button
            type="submit"
            name="submit"
            onClick={signupSubmit}
            className="w-full hover:bg-[#1c748a] text-white py-2 px-4 rounded-md bg-[#4598af] focus:outline-none focus:bg-[#1c748a]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
