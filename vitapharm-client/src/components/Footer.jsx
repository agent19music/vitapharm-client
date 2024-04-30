import React from 'react';

export default function VitapharmFooter() {
  return (
    <div>
      <footer className="">
        <div className="mx-auto grid max-w-screen-xl gap-y-8 gap-x-12 px-4 py-10 sm:px-20 md:grid-cols-2 xl:grid-cols-4 xl:px-10">
          <div className="max-w-sm">
            <div className="mb-6 flex h-10 items-center space-x-2">
              <img className="h-full object-contain" src="seanandprincelogo.jpg" alt="" />
              <span className="text-lg font-medium">Vitapharm</span>
            </div>
            <div className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad a officia ea expedita!</div>
          </div>
          <div className="">
            <div className="mt-4 mb-2 font-medium xl:mb-4">Guides</div>
            <nav aria-label="Guides Navigation" className="text-gray-500">
              <ul className="space-y-3">
                <li><a className="hover:text-orange-600 hover:underline" href="#">How to make a footer</a></li>
                <li><a className="hover:text-orange-600 hover:underline" href="#">Designing your app</a></li>
                <li><a className="hover:text-orange-600 hover:underline" href="#">Getting help from the community</a></li>
                <li><a className="hover:text-orange-600 hover:underline" href="#">Pricing vs Hourly Rate</a></li>
              </ul>
            </nav>
          </div>
          <div className="">
            <div className="mt-4 mb-2 font-medium xl:mb-4">SOCIALS</div>
            <nav aria-label="Footer Navigation" className="text-gray-500">
              <ul className="space-y-3">
                <li><a className="hover:text-orange-600 hover:underline" href="#">Instagram</a></li>
                <li><a className="hover:text-orange-600 hover:underline" href="#">Tiktok</a></li>
                <li><a className="hover:text-orange-600 hover:underline" href="#">Blogs</a></li>
                <li><a className="hover:text-orange-600 hover:underline" href="#">Support Hub</a></li>
                <li><a className="hover:text-orange-600 hover:underline" href="#">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="border-t">
          <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-4 py-3 text-center text-gray-500 sm:px-20 lg:flex-row lg:justify-between lg:text-left xl:px-10">
            <p className="">© 2022 Viapharm Cosmeics And Pharmacy | All Rights Reserved</p>
            <p className="">
              <a className="" href="#">Privacy Policy</a>
              <span>|</span>
              <a className="" href="#">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
