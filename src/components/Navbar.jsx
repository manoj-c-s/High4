import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../assets/petpet-logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className='fixed top-0 w-full bg-white z-10'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6'>
        <Link to='/'>
          <img src={logo} alt='Logo' className='h-12' />
        </Link>
        <div className='hidden md:flex space-x-8'>
          <Link
            to='/'
            className='text-black hover:text-primaryColor hover:text-opacity-75 flex items-center space-x-2'
          >
            <FaHome className='text-lg' />
            <span>Home</span>
          </Link>
          <a
            href='#experience'
            className='text-black hover:text-primaryColor hover:text-opacity-75 flex items-center space-x-2'
          >
            <FaMapMarkerAlt className='text-lg' />
            <span>Location</span>
          </a>
        </div>
        <div className='relative hidden md:flex items-center space-x-4'>
          <div
            className='flex items-center border border-gray-300 rounded-full shadow p-1 py-2 hover:shadow-lg'
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <FaBars className='text-gray-500 h-4 w-4 cursor-pointer mr-4 ml-2' />
            <FaUserCircle className='text-gray-500 h-8 w-8 cursor-pointer mr-2' />
            {isDropdownOpen &&
              (user ? (
                <div className='absolute right-0 mt-40 w-48 bg-white rounded-md shadow-lg py-2 z-20'>
                  <p className='block px-4 py-2 text-black hover:bg-gray-100'>
                    {user.first_name + user.last_name}
                  </p>
                  <button onClick={logout}>&nbsp; &nbsp; Logout</button>
                </div>
              ) : (
                <div className='absolute right-0 mt-40 w-48 bg-white rounded-md shadow-lg py-2 z-20'>
                  <a
                    href='login'
                    className='block px-4 py-2 text-black hover:bg-gray-100'
                  >
                    Log in
                  </a>
                </div>
              ))}
          </div>
        </div>
        <div className='md:hidden flex items-center'>
          <button
            onClick={toggleMenu}
            className='text-black focus:outline-none'
          >
            {isOpen ? (
              <FaTimes className='h-8 w-8' />
            ) : (
              <FaBars className='h-8 w-8' />
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className='md:hidden flex flex-col items-center bg-white py-4 space-y-4'>
          <Link
            to='/'
            className='text-black hover:text-primaryColor hover:text-opacity-75 flex items-center space-x-2'
            onClick={toggleMenu}
          >
            <FaHome className='text-lg' />
            <span>Home</span>
          </Link>
          <a
            href='#experience'
            className='text-black hover:text-primaryColor hover:text-opacity-75 flex items-center space-x-2'
            onClick={toggleMenu}
          >
            <FaMapMarkerAlt className='text-lg' />
            <span>Location</span>
          </a>
          <a
            href='#advanced-search'
            className='text-black hover:text-primaryColor hover:text-opacity-75'
            onClick={toggleMenu}
          >
            Advanced Search
          </a>
          <div className='relative'>
            <FaUserCircle
              className='text-black h-8 w-8 cursor-pointer border border-gray-300 rounded-full p-1'
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20'>
                <a
                  href='#signup'
                  className='block px-4 py-2 text-black hover:bg-gray-100'
                >
                  Sign up
                </a>
                <a
                  href='#login'
                  className='block px-4 py-2 text-black hover:bg-gray-100'
                >
                  Log in
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
