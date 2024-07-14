import React, { useState, useContext, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, FormErrorMessage, Select, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { format, isFuture } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { UserContext } from '../context/UserContext';
import logo from '/logo.png'; // Import your logo image
import Header from '../components/Header';
import Footer from '../components/ModernFooter';


const appointmentOptions = [
  { label: 'Consultation Service - Skin Attendant Consultation (1000 redeemable)', value: 'consultation_service_1000' },
  { label: 'Consultation Service - Dermatology / Skin Expert Clinic (3500)', value: 'consultation_service_3500' },
  { label: 'Facial Treatments - Chemical Peel (10k)', value: 'facial_treatment_chemical_peel_10k' },
  { label: 'Facial Treatments - Hydrafacial (15k)', value: 'facial_treatment_hydrafacial_15k' },
  { label: 'Facial Treatments - Timeless Facial Treatment (6k)', value: 'facial_treatment_timeless_6k' },
  { label: 'Facial Treatments - Deep Exfoliating (8k)', value: 'facial_treatment_deep_exfoliating_8k' },
  { label: 'Waxing - Underarm (700)', value: 'waxing_underarm_700' },
  { label: 'Waxing - Bikini (2k)', value: 'waxing_bikini_2k' },
  { label: 'Waxing - Double Treatment (14k)', value: 'waxing_double_treatment_14k' },
  { label: 'Body Massage - Swedish (5k)', value: 'body_massage_swedish_5k' },
  { label: 'Body Massage - Soft Tissue (from 4k)', value: 'body_massage_soft_tissue_from_4k' },
  { label: 'Body Massage - Deep Tissue (from 5k)', value: 'body_massage_deep_tissue_from_5k' },
  { label: 'Dermaplanning (4k)', value: 'dermaplanning_4k' },
  { label: 'Microneedling (18k)', value: 'microneedling_18k' },
  { label: 'Glutathione IV (25k)', value: 'glutathione_iv_25k' },
  { label: 'Skin Tag Removal (from 7k)', value: 'skin_tag_removal_from_7k' },
  { label: 'Skin Analysis (3000)', value: 'skin_analysis_3000' },
  { label: 'PRP', value: 'prp' }
];

function CustomerForm() {
  const { submitAppointment } = useContext(UserContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [countryCode, setCountryCode] = useState('+254');
  const [appointmentType, setAppointmentType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleCountryCodeChange = (e) => setCountryCode(e.target.value);
  const handleAppointmentTypeChange = (e) => setAppointmentType(e.target.value);

  const today = format(new Date(), 'yyyy-MM-dd');
  const isFirstNameError = submitted && firstName.trim() === '';
  const isLastNameError = submitted && lastName.trim() === '';
  const isEmailError = submitted && !email.includes('@');
  const isDateError = submitted && (date !== '' && !isFuture(new Date(formatInTimeZone(date, 'Africa/Nairobi', 'yyyy-MM-dd'))));
  const isPhoneError = submitted && phone.length !== 10;
  const isAppointmentTypeError = submitted && appointmentType.trim() === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Remove preceding zeros from phone number
    const trimmedPhone = phone.replace(/^0+/, '');

    if (!isFirstNameError && !isLastNameError && !isEmailError && !isDateError && !isPhoneError && !isAppointmentTypeError) {
      try {
        await submitAppointment({
          customer_name: `${firstName} ${lastName}`,
          customer_email: email,
          customer_phone: `${countryCode}${trimmedPhone}`, // Use trimmed phone number
          appointment_date: date,
          appointment_type: appointmentType
        });
        setSuccess(true);
        // Clear form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setDate('');
        setCountryCode('+254');
        setAppointmentType('');
      } catch (error) {
        console.error('Error submitting appointment:', error.message);
        // Handle error
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
    <Header/>
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 py-28'>
      <div className="mb-8">
        <img src={logo} alt="Logo" className="w-24 h-24 mx-auto" />
        <h1 className="text-2xl font-bold text-center mt-4 font-futurabold">
          Welcome to Vitapharm Beauty Appointment Booking
        </h1>
      </div>
      <div className="mx-auto w-full max-w-[550px] bg-white p-8 rounded-md shadow-md">
        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="firstName" className="mb-3 block text-base font-medium text-[#07074D]">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none ${isFirstNameError ? 'border-red-500' : 'focus:border-[#6A64F1] focus:shadow-md'}`}
              />
              {isFirstNameError && (
                <p className="text-red-500 text-sm mt-2">First name is required.</p>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="lastName" className="mb-3 block text-base font-medium text-[#07074D]">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastNameChange}
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none ${isLastNameError ? 'border-red-500' : 'focus:border-[#6A64F1] focus:shadow-md'}`}
              />
              {isLastNameError && (
                <p className="text-red-500 text-sm mt-2">Last name is required.</p>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none ${isEmailError ? 'border-red-500' : 'focus:border-[#6A64F1] focus:shadow-md'}`}
              />
              {isEmailError && (
                <p className="text-red-500 text-sm mt-2">Email is required and should include '@'.</p>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">Phone</label>
              <div className="flex">
              
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`w-full rounded-r-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none ${isPhoneError ? 'border-red-500' : 'focus:border-[#6A64F1] focus:shadow-md'}`}
                />
              </div>
              {isPhoneError && (
                <p className="text-red-500 text-sm mt-2">Phone number must be 10 digits.</p>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">Appointment Date</label>
              <input
                type="date"
                id="date"
                min={today}
                value={date}
                onChange={handleDateChange}
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none ${isDateError ? 'border-red-500' : 'focus:border-[#6A64F1] focus:shadow-md'}`}
              />
              {isDateError && (
                <p className="text-red-500 text-sm mt-2">Date should be later than today.</p>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="appointmentType" className="mb-3 block text-base font-medium text-[#07074D]">Appointment Type</label>
              <select
                id="appointmentType"
                value={appointmentType}
                onChange={handleAppointmentTypeChange}
                className={`w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none ${isAppointmentTypeError ? 'border-red-500' : 'focus:border-[#6A64F1] focus:shadow-md'}`}
              >
                <option value="" disabled>Select Appointment Type</option>
                {appointmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {isAppointmentTypeError && (
                <p className="text-red-500 text-sm mt-2">Appointment type is required.</p>
              )}
            </div>
            <div>
              <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg" className="font-futurabold">
              Appointment booking received!
            </AlertTitle>
            <AlertDescription maxWidth="sm" className="font-futura">
              Thanks for submitting your booking. Our team will get back to you
              soon to discuss further details.
            </AlertDescription>
          </Alert>
        )}
      </div>
    
    </div>
    <Footer />
    </>
  );
}

export default CustomerForm;
