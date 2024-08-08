import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main class="h-screen w-full flex flex-col justify-center items-center bg-white">
    <h1 class="text-9xl font-futuramedbold text-gray-800 tracking-widest flex justify-center items-center  w-screen">404</h1>
    <div class="bg-brown-custom px-2 py-0.5 font-futurabold text-sm rounded rotate-12 absolute text-white">
      Page Not Found
    </div>
    <button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-brown-custom group active:brown-custom focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-brown-custom group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>
  
        <span class="relative block px-8 py-3 bg-white border border-current font-futurabold">
          <Link to="/">Go Home</Link>
        </span>
      </a>
    </button>
  </main>
  
  )
}
