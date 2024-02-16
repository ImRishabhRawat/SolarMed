import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Button from './Button'
import { IoCall } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaUserCircle } from "react-icons/fa";
import { useAuth } from '../contexts/AuthContext';
import { MdOutlineLogout } from "react-icons/md";
import { motion } from 'framer-motion';
import { RiInstagramFill } from 'react-icons/ri';
import { RiAdminFill } from "react-icons/ri";

const NavLinks = () => {
    return (
        <>
            {["about", "doctors", "services", "contact"].map((items, index) => {
                return (
                    <Link to={`/${items}`} key={index} >{items}</Link>
                )  
            })}
        </>
    )
}


const Nav = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('userRole');
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
      const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [isOpen, setIsOpen] = useState();
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }
    useEffect(() => {
    setIsOpen(false);
    }, []);

    const handleLogout = () => {
    // Clear the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
    // Update the isLoggedIn state
        setIsLoggedIn(false);
        navigate("/");
  };
  return (
<>
      <nav className=" flex flex-[1] items-center justify-end overflow-hidden">
        <div className="hidden justify-end md:flex gap-5">
                  <NavLinks />   
              </div>
              <div className="flex ml-2 hidden sm:flex ">
                  {isLoggedIn ? ( <>
                      {role === "admin" ? (
                      <Link to = "/admin" className = 'px-4 py-2' >
                          <Button text="Admin Panel" icon={<RiAdminFill />} />
                      </Link>
                      )
                          : (<Link to = "/appointment" className = 'px-4 py-2' >
                          <Button text="Book a call" icon={<IoCall />} />
                      </Link>)}
                      <button onClick={handleLogout} className='border border-2 border-gray-400 text-xl my-2 rounded-2xl px-2  '>
                        <MdOutlineLogout />
                        </button>

                      </>
                ) :(
                      <>
                          <Link to="/login"
                className='px-4 py-2'>
                <button className='px-4 py-2 border-2 rounded-full'>LOGIN</button>
                </Link>
                <Link to="/signup"
                className='py-2'>
                    < Button text="SIGN UP" icon={ < FaUserCircle/>} />
                </Link>
                      </>
                )}
              </div>
        <div className="flex w-[45px] justify-end md:hidden ">
          <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>
          {
              isOpen && (
                  <div className="mt-4 w-full  basis-full md:hidden">
                      <div onClick={toggleNavbar}  className=" bg-[#fefefe] mb-2 p-4 rounded-xl border border-zinc-100 flex flex-row-reverse gap-4">
                          <div className="w-1/2  links flex flex-col  items-end text-[6vw] font-black tracking-wider">
                              <NavLinks />
                          </div>
                          <div className="wrap p-4 flex flex-col gap-10 items-center">
                              
                          <div className=" sm:hidden  flex items-center flex-col">
                              {isLoggedIn ? (
                                  <>
                            <Link to="/appointment" className='px-4 py-2' >
                                    <Button text="Book a call" icon={<IoCall />} />
                                </Link>
                                <button onClick={handleLogout} className='border-2 w-8 h-8 border-gray-400 text-xl rounded-2xl  flex items-center justify-center'>
                                    <MdOutlineLogout />
                                    </button>
                                      {/* <Button  text="Log out" icon={ <MdOutlineLogout />} /> */}
                                </>
                            ) :(
                                <>
                                    <Link to="/login"
                            className='px-4 py-2'>
                            <button className='px-4 py-2 border-2 rounded-full'>LOGIN</button>
                            </Link>
                            <Link to="/signup"
                            className='py-2'>
                                < Button text="SIGN UP" icon={ < FaUserCircle/>} />
                            </Link>
                                </>
                              )}
                              </div>
                              <div className="flex items-center gap-2 right">
                                    <Button icon={<FaFacebook />} />
                                    <Button icon={<RiInstagramFill />} />
                                    <Button icon={<FaTwitter />} /> 
                                </div>
                          </div>
                          
                      </div>
                  </div>
              )
        }
    </>
  )
}

export default Nav
