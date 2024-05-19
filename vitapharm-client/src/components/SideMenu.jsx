import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'react-feather';
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { ProductContext } from '../context/ProductContext';


const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { cartItems, subtotal, total, cartItemCount, cartEmpty, incrementQuantity, decrementQuantity } = useContext(ProductContext);

  const renderCart = () => {
      return (
          <Drawer isOpen={isOpen} onClose={toggleMenu} placement="right" size="lg">
              <DrawerOverlay>
                  <DrawerContent width="90px">
                      <DrawerCloseButton />
                      <DrawerBody>
            <section className="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
                </div>
        
                <div className="mx-auto mt-8 max-w-md md:mt-12">
                    <div className="rounded-3xl bg-white shadow-lg">
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                <ul className="-my-8">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                            <div className="shrink-0 relative">
                                                <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">{item.quantity}</span>
                                                <img className="h-24 w-24 max-w-full rounded-lg object-cover mr-4" src={`data:image/png;base64,${item.image_data[0].data}`} alt="" />
                                                <div className="absolute top-8 left-1 flex flex-col space-y-1">
                                                    <span className="flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow edit-cartamount" onClick={() => incrementQuantity(item.product_id)}>+</span>
                                                    <span className="flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow edit-cartamount" onClick={() => decrementQuantity(item.product_id)}>-</span>
                                                </div>
                                            </div>
        
                                            <div className="relative flex flex-1 flex-col justify-between">
                                                <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                                    <div className="pr-8 sm:pr-5">
                                                        <p className="text-base font-semibold text-gray-900">{item.product_name}</p>
                                                        <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{item.variation_size}</p>
                                                    </div>
        
                                                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                        <div className="relative flex space-x-2">
                                                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">Ksh {item.variation_price}</p>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                                    <button type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
        
                            <div className="mt-6 space-y-3 border-t border-b py-8">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-400">Subtotal</p>
                                    <p className="text-lg font-semibold text-gray-900">Ksh {subtotal}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-400">Shipping</p>
                                    <p className="text-lg font-semibold text-gray-900">Free</p>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Total</p>
                                <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">KSH</span> {total}</p>
                            </div>
        
                            <div className="mt-6 text-center">
                            <Link to={`/checkout`} className="group inline-flex w-full items-center justify-center rounded-md vp-bo px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:text-white custom-hover">
                              Place Order
                              <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                          </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            </DrawerBody>

            <DrawerFooter>
              {/* <div className="mt-6 text-center">
                <Link to={'/444'} type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                  Place Order
                  <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div> */}
             </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  };

  return (
    <div>
        <div onClick={toggleMenu} className={`shopping-bag ${!cartEmpty ? 'gentle-shake' : ''}`}>
            <span className="item-count">{cartItemCount}</span>
            <ShoppingBag />
        </div>
        {renderCart()}
    </div>
);
};

export default SideMenu;
