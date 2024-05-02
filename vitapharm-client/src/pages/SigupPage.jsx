import React from 'react';

const FormComponent = () => {
  return (
    <div>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="username-success" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Your name</label>
          <input type="text" id="username-success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="Bonnie Green" />
          <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Alright!</span> Username available!</p>
        </div>
        <div>
          <label htmlFor="username-error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Your name</label>
          <input type="text" id="username-error" className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Bonnie Green" />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
        </div>
      </form>

      <form className="max-w-sm mx-auto">
        <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {/* SVG code */}
          </div>
          <input type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
        </div>
      </form>

      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </div>
        <div className="mb-5">
          <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
          <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700 dark:text-white">I agree to the terms and conditions</label>
          </div>
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900 dark:focus:ring-blue-500">Sign up</button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
