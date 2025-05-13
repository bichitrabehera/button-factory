import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // FiX = close icon

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/custom-design", label: "Custom Design Tool" },
    { to: "/offers", label: "Offers" },
    { to: "/contact", label: "Contact Us" },
    { to: "/login", label: "Login" },
  ];

  return (
    <>
      {/* Top White Bar */}
      <nav className="bg-white w-full py-3 px-4 shadow-sm z-50 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="logo flex items-center gap-4">
            {/* Hamburger Icon for Mobile */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-2xl"
            >
              <FiMenu />
            </button>
            <h1 className="text-2xl font-semibold">Button Factory</h1>
          </div>
          <div className="hidden md:flex gap-6 text-[12px]">
            <div>
              <h1 className="font-semibold">Phone</h1>
              <p className="text-gray-600">+91 8888899999</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Nav Bar */}
      <nav className="bg-black w-full py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-white text-[14px] py-2 hover:text-gray-300 transition duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-64 bg-white text-black p-6 z-50 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setIsMenuOpen(false)}>
                <FiX className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[14px] hover:text-gray-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
