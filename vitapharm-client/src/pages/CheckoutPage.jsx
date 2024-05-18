import { useContext } from 'react';
import Header from '../components/Header';
import { ProductContext } from '../context/ProductContext';
import VitapharmFooter from '../components/Footer';
export default function CheckoutPage() {
  const { cartItems, total } = useContext(ProductContext); // Assuming total is provided by the context
  console.log(cartItems);

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">Vitapharm Checkout</a>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mb-10">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`data:image/png;base64,${item.image_data[0].data}`} alt="" />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{item.product_name}</span>
                  <span className="float-right text-gray-400">{item.quantity}</span>
                  <p className="text-lg font-bold">Ksh {item.total_price}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Pick Up Mtaani Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                </div>
              </label>
            </div>
            {/* <div className="relative">
              <input className="peer hidden" id="radio_2" type="radio" name="radio" />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">DHL Express</span>
                  <p className="text-slate-500 text-sm leading-6">Delivery: 1-3 Days</p>
                </div>
              </label>
            </div> */}
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">Complete your order by providing your payment details.</p>
          <div className="">
            <label htmlFor="first-name" className="mt-4 mb-2 block text-sm font-medium">First Name</label>
            <input type="text" id="first-name" name="first-name" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="First Name" />

            <label htmlFor="last-name" className="mt-4 mb-2 block text-sm font-medium">Last Name</label>
            <input type="text" id="last-name" name="last-name" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Last Name" />

            <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email Address</label>
            <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />

            <label htmlFor="town" className="mt-4 mb-2 block text-sm font-medium">Town</label>
            <input type="text" id="town" name="town" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Town" />

            <label htmlFor="phone" className="mt-4 mb-2 block text-sm font-medium">Phone</label>
            <input type="text" id="phone" name="phone" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Phone Number" />

            {/* Total */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">Ksh {total}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">Free</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">Ksh {total}</p>
            </div>
          </div>
          <button className="mt-4 mb-8 w-full bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
        </div>
      </div>
      <VitapharmFooter/>
    </div>
  );
}
