import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import { ProductContext } from '../context/ProductContext';
import Footer from '../components/ModernFooter';
import { Spinner, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

export default function CheckoutPage() {
  const { cartItems, total, sessionToken, apiEndpoint, setCartItems } = useContext(ProductContext);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [town, setTown] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleTownChange = (e) => setTown(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const isFirstNameError = submitted && firstName.trim() === '';
  const isLastNameError = submitted && lastName.trim() === '';
  const isEmailError = submitted && !email.includes('@');
  const isTownError = submitted && town.trim() === '';
  const isPhoneError = submitted && phone.length !== 10;
  const isAddressError = submitted && address.trim() === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setIsLoading(true); // Set loading to true when form is submitted
  
    const formData = {
      customerFirstName: firstName,
      customerLastName: lastName,
      customerEmail: email,
      town,
      phone,
      address: address,
    };
  
    // console.log('Form Data:', formData, sessionToken); // Log the form data
  
    if (!isFirstNameError && !isLastNameError && !isEmailError && !isTownError && !isPhoneError && !isAddressError) {
      try {
        const response = await fetch(`${apiEndpoint}/order/place`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`
          },
          body: JSON.stringify(formData),
          credentials: 'include', // Include cookies in the request
        });
  
        const result = await response.json();
  
        console.log('Response:', result); // Log the response
  
        if (response.ok) {
          setIsSuccess(true); // Set success to true when response is ok
          setFirstName('');
          setLastName('');
          setEmail('');
          setTown('');
          setPhone('');
          setAddress('');
          setCartItems([]);
        } else {
          setError(result.error);
        }
      } catch (error) {
        console.error('Error:', error); // Log the error
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false); // Set loading to false after response is received
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-futuramedbold text-gray-800">Vitapharm Checkout</a>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mb-10">
        <div className="px-4 pt-8">
          {!isSuccess && (
            <>
              <p className="text-xl font-futurabold">Order Summary</p>
              <p className="text-gray-400 font-futurabold">Check your items. And select a suitable shipping method.</p>
              <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`${item.image_data[0].url}`} alt="" />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className=" font-futurabold">{item.product_name}</span>
                      <span className="float-right font-futurabold text-gray-400">{item.quantity}</span>
                      <p className="text-lg font-futuramedbold">Ksh {item.total_price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-lg font-futurabold">Shipping Methods</p>
              <form className="mt-5 grid gap-6" onSubmit={handleSubmit}>
                <div className="relative">
                  <input className="peer hidden" id="radio_1" type="radio" name="radio" defaultChecked />
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                    <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                    <div className="ml-5">
                      <span className="mt-2 font-futurabold">Pick Up Mtaani Delivery</span>
                      <p className="text-slate-500 text-sm leading-6 font-futurabold">Delivery: 1-2 Days</p>
                    </div>
                  </label>
                </div>
              </form>

            </>
           
          )}
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          {isSuccess ? (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle className='font-futuramedbold' mr={2}>Your order has been placed!</AlertTitle>
              <AlertDescription className='font-futurabold'>You will receive a confirmation email shortly. Thank you for shopping with us.</AlertDescription>
            </Alert> // Display success alert when order is successful
          ) : (
            <>
              {cartItems.length === 0 ? (
                <Alert status="warning">
                  <AlertIcon />
                  <AlertTitle mr={2} className='font-futuramedbold'>Oops!</AlertTitle>
                  <AlertDescription className='font-futurabold'>Looks like your cart is empty. Browse around and add products to your cart.</AlertDescription>
                </Alert>
              ) : (
                <>
                  <p className="text-xl font-futuramedbold">Payment Details</p>
                  <p className="text-gray-400 font-futurabold">Complete your order by providing your payment details.</p>
                  <div>
                    {isLoading ? (
                      <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='#693F2D' // Use the hexadecimal color here
                        size='xl'
                      />
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <label htmlFor="first-name" className="mt-4 mb-2 block text-sm font-futurabold">First Name</label>
                        <input
                          type="text"
                          id="first-name"
                          name="first-name"
                          className="w-full rounded-md border font-futurabold border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-brown-custom focus:ring-brown-custom"
                          placeholder="First Name"
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                        {isFirstNameError && <p className="text-red-500 font-futurabold text-sm">First name is required.</p>}
          
                        <label htmlFor="last-name" className="mt-4 mb-2 font-futurabold block text-sm font-medium">Last Name</label>
                        <input
                          type="text"
                          id="last-name"
                          name="last-name"
                          className="w-full rounded-md font-futurabold border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                        {isLastNameError && <p className="text-red-500 font-futurabold text-sm">Last name is required.</p>}
          
                        <label htmlFor="email" className="mt-4 mb-2 font-futurabold block text-sm font-medium">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full rounded-md border font-futurabold border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="your.email@gmail.com"
                          value={email}
                          onChange={handleEmailChange}
                        />
                        {isEmailError && <p className="text-red-500 font-futurabold text-sm">Email is required and should include '@'.</p>}
          
                        <label htmlFor="town" className="mt-4 font-futurabold mb-2 block text-sm font-medium">Town</label>
                        <input
                          type="text"
                          id="town"
                          name="town"
                          className="w-full rounded-md font-futurabold border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Town"
                          value={town}
                          onChange={handleTownChange}
                        />
                        {isTownError && <p className="text-red-500 font-futurabold text-sm">Town is required.</p>}
          
                        <label htmlFor="address" className="mt-4 font-futurabold mb-2 block text-sm font-medium">Address</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="w-full rounded-md border font-futurabold border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Address"
                          value={address}
                          onChange={handleAddressChange}
                        />
                        {isAddressError && <p className="text-red-500 font-futurabold text-sm">Address is required.</p>}
          
                        <label htmlFor="phone" className="mt-4 mb-2 block font-futurabold text-sm font-medium">Phone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full rounded-md border font-futurabold border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={handlePhoneChange}
                        />
                        {isPhoneError && <p className="text-red-500 font-futurabold text-sm">Phone number must be 10 digits.</p>}
          
                        {/* Total */}
                        <div className="mt-6 border-t border-b py-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-futurabold text-gray-900">Subtotal</p>
                            <p className="font-futuramedbold text-gray-900">Ksh {total}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-futurabold text-gray-900">Shipping</p>
                            <p className="font-futuramedbold text-gray-900">Free</p>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <p className="text-sm font-futurabold text-gray-900">Total</p>
                          <p className="text-2xl font-futurabold text-gray-900">Ksh {total}</p>
                        </div>
          
                        {error && <p className="text-red-500 font-futurabold text-sm mt-4">{error}</p>}
          
                        <button type="submit" className="mt-4 mb-8 w-full font-futuramedbold bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
                      </form>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
