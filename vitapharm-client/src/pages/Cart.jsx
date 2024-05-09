import React from 'react'
import { Link } from 'react-router-dom';

export default function Cart() {

  
  return (
    <div>
        <section class="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
  <div class="mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-center">
      <h1 class="text-2xl font-semibold text-gray-900">Your Cart</h1>
    </div>

    <div class="mx-auto mt-8 max-w-md md:mt-12">
      <div class="rounded-3xl bg-white shadow-lg">
        <div class="px-4 py-6 sm:px-8 sm:py-10">
          <div class="flow-root">
            <ul class="-my-8">
            <li class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
  <div class="shrink-0 relative">
    <span class="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">1</span>
    <img class="h-24 w-24 max-w-full rounded-lg object-cover mr-4" src="/slide1.avif" alt="" />
    <div class="absolute top-8 left-1 flex flex-col space-y-1 ">
      <span class="flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow edit-cartamount">+</span>
      <span class="flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow edit-cartamount">-</span>
    </div>
  </div>

                <div class="relative flex flex-1 flex-col justify-between">
                  <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                    <div class="pr-8 sm:pr-5">
                      <p class="text-base font-semibold text-gray-900">L'oreal Scalp Advanced</p>
                      <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">500 ml</p>
                    

                    </div>

                    <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
              <div class="relative flex space-x-2">
                <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">Ksh 6500</p>
                  </div>
</div>



                  </div>

                  <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                    <button type="button" class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class=""></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
              <li class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
  <div class="shrink-0 relative">
    <span class="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">1</span>
    <img class="h-24 w-24 max-w-full rounded-lg object-cover mr-4" src="/prod6.jpg" alt="" />
    <div class="absolute top-8 left-1 flex flex-col space-y-1 ">
      <span class="flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow edit-cartamount">+</span>
      <span class="flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow edit-cartamount">-</span>
    </div>
  </div>

                <div class="relative flex flex-1 flex-col justify-between ">
                  <div class="sm:col-gap-5 sm:grid sm:grid-cols-2 ">
                    <div class="pr-8 sm:pr-5">
                      <p class="text-base font-semibold text-gray-900">CeraVe Acne Control Cleanser</p>
                      <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">237 ml</p>
                    </div>

                    <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                    <div class="relative flex space-x-2">
                <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">Ksh 2200</p>
            
              </div>
                    </div>
                  </div>

                  <div class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                    <button type="button" class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                      <svg class="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" class=""></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* <hr class="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" />  */}

          <div class="mt-6 space-y-3 border-t border-b py-8">
            <div class="flex items-center justify-between">
              <p class="text-gray-400">Subtotal</p>
              <p class="text-lg font-semibold text-gray-900">Ksh 8700.00</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-gray-400">Shipping</p>
              <p class="text-lg font-semibold text-gray-900">Free</p>
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-medium text-gray-900">Total</p>
            <p class="text-2xl font-semibold text-gray-900"><span class="text-xs font-normal text-gray-400">KSH</span> 8700.00</p>
          </div>

          <div class="mt-6 text-center">
            <Link  to={'/444'} type="button" class="group inline-flex w-full items-center justify-center rounded-md vp-bo px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
              Place Order
              <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
