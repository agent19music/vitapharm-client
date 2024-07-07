import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-500 p-4">
      <a className="text-white uppercase" href="#">Home</a>
      <a className="text-white uppercase ml-4" href="#">About</a>
      <a className="text-white uppercase ml-4" href="#">Contact</a>
      <div className="relative inline-block text-left ml-4">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white uppercase">More</button>
        {isOpen && (
          <div className="absolute left-0 w-64 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-1 py-1 ">
              <h3 className="text-gray-900">HTML and CSS</h3>
              <a className="text-gray-700 block px-4 py-2 text-sm" href="#">Learn HTML</a>
              <a className="text-gray-700 block px-4 py-2 text-sm" href="#">Learn CSS</a>
              <a className="text-gray-700 block px-4 py-2 text-sm" href="#">Bootstrap 4</a>
            </div>
            <div className="px-1 py-1">
              <h3 className="text-gray-900">Server Side</h3>
              <a className="text-gray-700 block px-4 py-2 text-sm" href="#">Learn PHP</a>
              <a className="text-gray-700 block px-4 py-2 text-sm" href="#">Learn Python</a>
              <a className="text-gray-700 block px-4 py-2 text-sm" href="#">Learn Node.js</a>
            </div>
            <div className="px-1 py-1">
              <h3 className="text-gray-900">Frameworks</h3>
              <a className="text-gray-700 block px-4 py-2 text-sm" href="#">VueJS</a>
              <a className="text-gray-700 block px-4 py-2 text-sm" href="#">Laravel</a>
              <a className="text-gray-700 block px-4 py-2 text-sm" href="#">CodeIgniter</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
