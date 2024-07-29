import React, { useState, useContext, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { ProductContext } from '../context/ProductContext';
import Footer from '../components/ModernFooter';
import { Spinner, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";
import { PaystackButton } from 'react-paystack';
import {
  Box,
  Button,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";

export default function CheckoutPage() {
  const { cartItems, total, sessionToken, apiEndpoint, setCartItems, setTotal, setCartEmpty, setCartItemCount } = useContext(ProductContext);
  const publicKey = "";
  const [orderCreated, setOrderCreated] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dialogContent, setDialogContent] = useState("");
  const cancelRef = useRef();
  const toast = useToast()
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [town, setTown] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingOption, setShippingOption] = useState('within_nairobi');
  const [shippingCost, setShippingCost] = useState(150);
  const [paymentOption, setPaymentOption] = useState('m-pesa');
  const [formData, setFormData] = useState(null);
  const [orderID, setOrderID] = useState(null);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [promoSubmitted, setPromoSubmitted] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(total);
  const [originalTotal, setOriginalTotal] = useState(total);
  const [promocodeApplied, setPromoCodeApplied] = useState('')


    // Update formData whenever relevant fields change
    useEffect(() => {
      setFormData({
        customerFirstName: firstName,
        customerLastName: lastName,
        customerEmail: email,
        town,
        phone,
        address,
        deliverycost: shippingCost,
        discounted_total: discountedTotal + shippingCost,
        discount_percentage: discountPercentage,
        original_total: originalTotal,
        discount_code_applied: promocodeApplied
      });
    }, [firstName, lastName, email, town, phone, address, shippingCost, discountedTotal, discountPercentage, originalTotal]);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleTownChange = (e) => setTown(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handlePromoCodeChange = (e) => setPromoCode(e.target.value);
 

  const handleShippingChange = (e) => {
    setShippingOption(e.target.value);
    if (discountedTotal >= 8000) {
      setShippingCost(0);
    } else if (e.target.value === 'within_nairobi') {
      setShippingCost(150);
    } else if (e.target.value === 'outskirts') {
      setShippingCost(250);
    } else {
      setShippingCost(0);
    }
  };


  const handlePaymentChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const onSuccess = (reference) => {
    verifyPayment(reference);
  };
  
  const handleClose = () => {
    if (dialogContent === "Payment verified successfully!") {
      setIsSuccess(true);
      setCartEmpty(true)
      setCartItemCount(0)
    }
    onClose();
  };
  

  const createOrder = async () => {
  
    if (!isFirstNameError && !isLastNameError && !isEmailError && !isTownError && !isPhoneError && !isAddressError) {
      try {
        const response = await fetch(`${apiEndpoint}/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken}`
          },
          body: JSON.stringify(formData)
        });
  
        const result = await response.json();
        if (response.ok) {
          setOrderID(result.order_id);
        } else {
          setError(result.error);
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred. Please try again.');
      }
    } else {
      throw new Error('Form validation failed');
    }
  };
  
  

  const handlePayButtonClick = async () => {
    setSubmitted(true);
    try {
      await createOrder(); // Wait for createOrder to complete
      setOrderCreated(true); // Set order created flag to true only if createOrder was successful
      // Additional logic if needed after order creation
    } catch (error) {
      console.error('Error creating order:', error);
      // Handle error if needed
    }
  };
  

  const componentProps = {
    email,
    amount: (discountedTotal + shippingCost) * 100, 
    currency: 'KES',
    publicKey,
    metadata: {
      firstName,
      phone,
      order_id: orderID,
      ...formData,
    },
    order_id: orderID,
    text: "Pay Now",
    onSuccess: (reference) => {
      verifyPayment(reference);
    },
    onClose: () => {
      toast({
        title: "Payment not completed.",
        description: "You cancelled the payment",
        status: "error",
        duration: 1700,
        isClosable: true,
        position: "top-right",
        variant: "subtle",
        colorScheme: "red",
      });

    },
    channels: ['card', 'mobile_money'], 
  };

  const verifyPayment = async (reference) => {
    try {
      const response = await fetch(`${apiEndpoint}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({ reference: reference.reference, formData, order_id: orderID })
      });
  
      const result = await response.json();
      if (response.ok) {
        setDialogContent("Payment verified successfully!");
      } else {
        setDialogContent(result.error);
      }
      onOpen();
    } catch (error) {
      console.error('Error:', error);
      setDialogContent('An unexpected error occurred. Please try again.');
      onOpen();
    }
  };
  

  const isFirstNameError = submitted && firstName.trim() === '';
  const isLastNameError = submitted && lastName.trim() === '';
  const isEmailError = submitted && !email.includes('@');
  const isTownError = submitted && town.trim() === '';
  const isPhoneError = submitted && phone.length !== 10;
  const isAddressError = submitted && address.trim() === '';
  const isPromoCodeError = promoSubmitted && promoCode.trim() === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPromoSubmitted(true)
    setPromoLoading(true);
    if (promoCode !== '') {
        try {
            const response = await fetch(`${apiEndpoint}/discount/validate/${promoCode}`);
            const result = await response.json();
            if (response.ok) {
                setPromoApplied(true);
                setDiscountPercentage(result.discount_percentage);
                setPromoCodeApplied(result.code)
                setPromoError('')
            } else {
                setPromoError(result.error);
            }
        } catch (error) {
            setPromoError('Invalid promo code. Please try again.');
        } finally {
            setPromoLoading(false);
        }
    } else {
        setPromoLoading(false);
    }
};


 useEffect(() => {
    setDiscountedTotal(promoApplied ? total - (total * discountPercentage / 100) : total);
    setOriginalTotal(total + shippingCost);

    // Update shipping cost to 0 if discounted total is 8000 or more
    if (discountedTotal >= 8000) {
      setShippingCost(0);
    }
  }, [total, promoApplied, discountPercentage, discountedTotal, shippingCost]);

  return (
    <div>
      <Header/>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-futuramedbold text-gray-800 hover:text-brown-custom">Vitapharm Checkout</a>
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

              <p className="mt-8 text-lg font-futurabold">Payment Options</p>
              <form className="mt-5 grid gap-6">

  <div className="relative">
    <input className="peer hidden" id="payment_2" type="radio" name="payment" value='m-pesa' checked={paymentOption === 'm-pesa'} onChange={handlePaymentChange} />
    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="payment_2">
      <img className="w-14 object-contain" src="/podlogo.png" alt="" />
      <div className="ml-5">
        <span className="mt-2 font-futuramedbold">Vitapharm Pay</span>
        <p className="text-smd text-gray-400 font-futurabold">Accepts card and m-pesa</p>
      </div>
    </label>
  </div>
</form>


    <p className="mt-8 text-lg font-futurabold">Your Delivery Details</p>
              <p className="mt-1 text-smd font-futurabold">*Orders above 8000 bob qualify for free delivery</p>
              <form className="mt-5 grid gap-6">
                <div className="relative">
                  <input className="peer hidden" id="shipping_1" type="radio" name="shipping" value="within_nairobi" checked={shippingOption === 'within_nairobi'} onChange={handleShippingChange} />
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="shipping_1">
                    <div className="ml-5">
                      <span className="mt-2 font-futuramedbold">Within Nairobi</span>
                      <p className="text-smd text-gray-400 font-futurabold">Delivered within 24 Hours</p>
                      <p className="text-smd text-gray-400 font-futurabold">Ksh 150</p>
                    </div>
                  </label>
                </div>
                <div className="relative">
                  <input className="peer hidden" id="shipping_2" type="radio" name="shipping" value="outskirts" checked={shippingOption === 'outskirts'} onChange={handleShippingChange} />
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="shipping_2">
                    <div className="ml-5">
                      <span className="mt-2 font-futuramedbold">Outskirts of Nairobi</span>
                      <p className="text-smd text-gray-400 font-futurabold">Delivered within 48 Hours</p>
                      <p className="text-smd text-gray-400 font-futurabold">Ksh 250</p>
                    </div>
                  </label>
                </div>
                <div className="relative">
                  <input className="peer hidden" id="shipping_3" type="radio" name="shipping" value="pickup" checked={shippingOption === 'pickup'} onChange={handleShippingChange} />
                  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="shipping_3">
                    <div className="ml-5">
                      <span className="mt-2 font-futuramedbold">Store Pickup</span>
                      <p className="text-smd text-gray-400 font-futurabold">Pick up from our store</p>
                      <p className="text-smd text-gray-400 font-futurabold">Free</p>
                    </div>
                  </label>
                </div>
              </form>

            </>
           
          )}
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          {isSuccess ? (
            <Alert status="success" className='min-h-32'>
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
                     <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                     <Spinner
                       thickness="6px"
                       speed="0.65s"
                       emptyColor="gray.200"
                       color="#693F2D"
                       size="2xl"
                     />
                   </Box>
                   
                    ) : (
                      <form >
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
                            <p className="font-futuramedbold text-gray-900">{shippingCost}</p>
                          </div>
                        </div>
                        {promoApplied && (
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-futurabold text-gray-900">Discounted Total</p>
                          <p className="font-futuramedbold text-gray-900">Ksh {total}</p>
                        </div>
                      )}
                        <div className="mt-6 flex items-center justify-between">
                          <p className="text-sm font-futurabold text-gray-900">Total</p>
                          <p className="text-2xl font-futurabold text-gray-900">Ksh {discountedTotal+shippingCost}</p>
                          
                        </div>
                        <Box as="form" onSubmit={handleSubmit} mt={4}>
                    <FormControl display="flex" alignItems="center" justifyContent="space-between">
                        <Input
                            type="text"
                            value={promoCode}
                            onChange={handlePromoCodeChange}
                            placeholder="Enter promo code"
                            w="2/3"
                            border="1px"
                            borderRadius="md"
                            p={2}
                        />
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            ml={2}
                            py={2}
                            px={4}
                            fontWeight="bold"
                            borderRadius="md"
                            bg={promoApplied ? 'green.500' : 'black'}
                            _hover={{ bg: promoApplied ? 'gray.400' : 'blue.700' }}
                            color="white"
                            disabled={promoApplied}
                        >
                            {promoLoading ? <Spinner size="sm" /> : promoApplied ? 'Applied' : 'Apply'}
                        </Button>
                    </FormControl>
                    {promoError && (
                        <Alert status="error" mt={4}>
                            <AlertIcon />
                            <AlertTitle mr={2}>Error!</AlertTitle>
                            <AlertDescription>{promoError}</AlertDescription>
                        </Alert>
                    )}
                    {isPromoCodeError && <p className="text-red-500 font-futurabold text-sm">Promocode is required.</p>}
                    {promoApplied && <p className="text-green-500 font-futurabold text-sm">Promocode accepted.</p>}
                </Box>

                                 
                        {error && <p className="text-red-500 font-futurabold text-sm mt-4">{error}</p>}

                        {/* {paymentOption === 'm-pesa' && <button  onClick={handleSubmit} className="mt-4 mb-8 w-full font-futuramedbold bg-green-600 px-6 py-3 font-medium text-white">Proceed to pay with M-pesa</button>}

          
                        {paymentOption === 'pod' && <button  onClick={handleSubmit}className="mt-4 mb-8 w-full font-futuramedbold bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>} */}
                        </form>
                    )}
                          <button
                          className="mt-6 mb-8 w-full font-futuramedbold bg-green-600 px-6 py-3 font-medium text-white"
                          onClick={handlePayButtonClick}
                        >
                          Proceed to pay
                        </button>
                        {orderCreated  && !isFirstNameError && !isLastNameError && !isEmailError && !isTownError && !isPhoneError && !isAddressError && (
                          <PaystackButton className='mt-6 mb-8 w-full font-futuramedbold bg-green-600 px-6 py-3 font-medium text-white' {...componentProps} />
                        )}

                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <AlertDialog
    isOpen={isOpen}
    leastDestructiveRef={cancelRef}
    onClose={handleClose}
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogHeader></AlertDialogHeader>
        <AlertDialogBody>
          {dialogContent}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={handleClose}>
            OK
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
      <Footer />
    </div>
  );
}
