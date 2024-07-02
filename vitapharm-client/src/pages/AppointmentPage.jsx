import React, { useState, useContext } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, FormErrorMessage, Select, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { format, isFuture } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { UserContext } from '../context/UserContext';
import logo from '/logo.png'; // Import your logo image
import Header from '../components/Header';
import Footer from '../components/ModernFooter';

const countries = [
  { label: 'Kenya (+254)', value: '+254' },
  { label: 'United States (+1)', value: '+1' },
  { label: 'United Kingdom (+44)', value: '+44' },
  { label: 'India (+91)', value: '+91' },
  { label: 'United Arab Emirates (+971)', value: '+971' },
  { label: 'Tanzania (+255)', value: '+255' },
  { label: 'Rwanda (+250)', value: '+250' },
];

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

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mx-auto">
        <div className="mb-8">
          <img src={logo} alt="Logo" className="w-24 h-24 mx-auto" />
          <h1 className="text-2xl font-bold text-center mt-4 font-futurabold">
            Welcome to Vitapharm Beauty Appointment Booking
          </h1>
        </div>
        <Box p={5} className="bg-white shadow-md rounded-lg max-w-lg w-full">
          {!success ? (
            <VStack as="form" onSubmit={handleSubmit} spacing={5}>
              <FormControl id="firstName" isInvalid={isFirstNameError}>
                <FormLabel className="font-futurabold">First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="font-futura"
                />
                {isFirstNameError && (
                  <FormErrorMessage className="font-futura">
                    First name is required.
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="lastName" isInvalid={isLastNameError}>
                <FormLabel className="font-futurabold">Last Name</FormLabel>
                <Input
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className="font-futura"
                />
                {isLastNameError && (
                  <FormErrorMessage className="font-futura">
                    Last name is required.
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="email" isInvalid={isEmailError}>
                <FormLabel className="font-futurabold">Email Address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="font-futura"
                />
                {isEmailError && (
                  <FormErrorMessage className="font-futura">
                    Email is required and should include '@'.
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="phone" isInvalid={isPhoneError}>
                <FormLabel className="font-futurabold">Phone</FormLabel>
                <Select
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                  className="font-futura"
                >
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </Select>
                <Input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="font-futura"
                />
                {isPhoneError && (
                  <FormErrorMessage className="font-futura">
                    Phone number must be 10 digits.
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="date" isInvalid={isDateError}>
                <FormLabel className="font-futurabold">Appointment Date</FormLabel>
                <Input
                  type="date"
                  min={today}
                  value={date}
                  onChange={handleDateChange}
                  className="font-futura select-none"
                />
                {isDateError && (
                  <FormErrorMessage className="font-futura">
                    Date should be later than today.
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl id="appointmentType" isInvalid={isAppointmentTypeError}>
                <FormLabel className="font-futurabold">Appointment Type</FormLabel>
                <Select
                  value={appointmentType}
                  onChange={handleAppointmentTypeChange}
                  placeholder="Select Appointment Type" // Add placeholder text
                  className="font-futura"
                >
                  {appointmentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                {isAppointmentTypeError && (
                  <FormErrorMessage className="font-futura">
                    Appointment type is required.
                  </FormErrorMessage>
                )}
              </FormControl>

              <Button colorScheme="blue" type="submit" className='font-futuramedbold'>
                Submit
              </Button>
            </VStack>
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
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default CustomerForm;
