import React, { useState, useContext } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, FormErrorMessage, Select, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { format, isFuture } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { UserContext } from '../context/UserContext';
import logo from '/logo.png'; // Import your logo image
import Header from '../components/Header';

const countries = [
  { label: 'Kenya (+254)', value: '+254' },
  { label: 'United States (+1)', value: '+1' },
  { label: 'United Kingdom (+44)', value: '+44' },
  { label: 'India (+91)', value: '+91' },
  { label: 'United Arab Emirates (+971)', value: '+971' },
  { label: 'Tanzania (+255)', value: '+255' },
  { label: 'Rwanda (+250)', value: '+250' },
];

function CustomerForm() {
  const { submitAppointment } = useContext(UserContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [countryCode, setCountryCode] = useState('+254');
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleCountryCodeChange = (e) => setCountryCode(e.target.value);

  const today = format(new Date(), 'yyyy-MM-dd');
  const isFirstNameError = submitted && firstName.trim() === '';
  const isLastNameError = submitted && lastName.trim() === '';
  const isEmailError = submitted && !email.includes('@');
  const isDateError = submitted && (date !== '' && !isFuture(new Date(formatInTimeZone(date, 'Africa/Nairobi', 'yyyy-MM-dd'))));
  const isPhoneError = submitted && phone.length !== 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Remove preceding zeros from phone number
    const trimmedPhone = phone.replace(/^0+/, '');
  
    if (!isFirstNameError && !isLastNameError && !isEmailError && !isDateError && !isPhoneError) {
      try {
        await submitAppointment({
          customer_name: `${firstName} ${lastName}`,
          customer_email: email,
          customer_phone: `${countryCode}${trimmedPhone}`, // Use trimmed phone number
          appointment_date: date,
        });
        setSuccess(true);
        // Clear form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setDate('');
        setCountryCode('+254');
      } catch (error) {
        console.error('Error submitting appointment:', error.message);
        // Handle error
      }
    }
  };
  

  return (
    <div>
      <Header/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mx-auto">
      <div className="mb-8">
        <img src={logo} alt="Logo" className="w-24 h-24 mx-auto" />
        <h1 className="text-2xl font-bold text-center mt-4">Welcome to Vitapharm Beauty Appointment Booking</h1>
      </div>
      <Box p={5} className="bg-white shadow-md rounded-lg max-w-lg w-full">
        {!success ? (
          <VStack as="form" onSubmit={handleSubmit} spacing={5}>
            <FormControl id="firstName" isInvalid={isFirstNameError}>
              <FormLabel>First Name</FormLabel>
              <Input type="text" value={firstName} onChange={handleFirstNameChange} />
              {isFirstNameError && <FormErrorMessage>First name is required.</FormErrorMessage>}
            </FormControl>

            <FormControl id="lastName" isInvalid={isLastNameError}>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" value={lastName} onChange={handleLastNameChange} />
              {isLastNameError && <FormErrorMessage>Last name is required.</FormErrorMessage>}
            </FormControl>

            <FormControl id="email" isInvalid={isEmailError}>
              <FormLabel>Email Address</FormLabel>
              <Input type='email' value={email} onChange={handleEmailChange} />
              {isEmailError && <FormErrorMessage>Email is required and should include '@'.</FormErrorMessage>}
            </FormControl>

            <FormControl id="phone" isInvalid={isPhoneError}>
              <FormLabel>Phone</FormLabel>
              <Select value={countryCode} onChange={handleCountryCodeChange}>
                {countries.map(country => (
                  <option key={country.value} value={country.value}>{country.label}</option>
                ))}
              </Select>
              <Input type="tel" value={phone} onChange={handlePhoneChange} />
              {isPhoneError && <FormErrorMessage>Phone number must be 10 digits.</FormErrorMessage>}
            </FormControl>

            <FormControl id="date" isInvalid={isDateError}>
              <FormLabel>Appointment Date</FormLabel>
              <Input type="date" min={today} value={date} onChange={handleDateChange} />
              {isDateError && <FormErrorMessage>Date should be later than today.</FormErrorMessage>}
            </FormControl>

            <Button colorScheme="blue" type="submit">Submit</Button>
          </VStack>
        ) : (
          <Alert
            status='success'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
          >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
              Application submitted!
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
              Thanks for submitting your application. Our team will get back to you soon.
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </div>
    </div>
  );
}

export default CustomerForm;
