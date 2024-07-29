import React from 'react';
import Header from '../components/Header';
import Footer from '../components/ModernFooter';



const PrivacyPolicy = () => {
  return (
    <>
    <Header/>
    <div className="bg-gray-100 min-h-screen py-10 px-5 md:px-20 lg:px-40">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-futuramedbold mb-6 text-center text-brown-custom">Privacy Policy</h1>
        <p className="text-gray-700 mb-4 text-sm text-center">Effective Date: 29/07/2024</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-futuramedbold mb-4 text-brown-custom">Introduction</h2>
          <p className="font-futurabold">
            Welcome to Vitapharm Cosmetics and Pharmacy. We value your privacy and are committed to protecting your personal data. 
            This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website and use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-futuramedbold mb-4 text-brown-custom">Information We Collect</h2>
          <div className="mb-4">
            <h3 className="text-xl font-futuramedbold text-brown-custom">1. Personal Information:</h3>
            <ul className="list-disc list-inside font-futurabold">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Payment information (credit/debit card details, billing address)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-futuramedbold text-brown-custom">2. Appointment Information:</h3>
            <p className="font-futurabold">
              Details about your appointments, including the services you book and the dates and times of those appointments.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-futuramedbold mb-4 text-brown-custom">How We Use Your Information</h2>
          <p className="font-futurabold">
            We use your information for the following purposes:
          </p>
          <ul className="list-disc list-inside font-futurabold">
            <li>To process your payments and ensure your transactions are secure.</li>
            <li>To manage your appointments and provide the requested services.</li>
            <li>To communicate with you regarding your bookings, orders, and any other inquiries.</li>
            <li>To improve our website and services based on your feedback and interactions.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-futuramedbold mb-4 text-brown-custom">Security of Your Information</h2>
          <p className="font-futurabold">
            We hold the highest security standards to protect your personal data. This includes:
          </p>
          <ul className="list-disc list-inside font-futurabold">
            <li><span className="font-medium">Data Encryption:</span> Sensitive information, such as payment details, is encrypted before storage and during transmission.</li>
            <li><span className="font-medium">Hashed Data:</span> Sensitive data is hashed to provide an additional layer of security.</li>
            <li><span className="font-medium">Secure Payment Processing:</span> We use industry-leading payment processors to handle your payment information securely.</li>
            <li><span className="font-medium">Regular Security Audits:</span> We regularly review and update our security practices to ensure your data is protected.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-futuramedbold mb-4 text-brown-custom">Data Sharing</h2>
          <p className="font-futurabold">
            We strictly do not share your personal data with third parties, except:
          </p>
          <ul className="list-disc list-inside font-futurabold">
            <li>As necessary to process your payments through secure payment gateways.</li>
            <li>As required by law or to comply with legal processes.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-futuramedbold mb-4 text-brown-custom">Your Rights</h2>
          <p className="font-futurabold">
            You have the right to:
          </p>
          <ul className="list-disc list-inside font-futurabold">
            <li>Access and review the personal information we hold about you.</li>
            <li>Request corrections to any inaccurate or incomplete information.</li>
            <li>Request the deletion of your personal data, subject to legal and contractual restrictions.</li>
            <li>Opt-out of receiving promotional communications from us.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-futuramedbold mb-4 text-brown-custom">Cookies and Tracking Technologies</h2>
          <p className="font-futurabold">
            We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can manage your cookie preferences through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-futuramedbold mb-4 text-brown-custom">Changes to This Privacy Policy</h2>
          <p className="font-futurabold">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new policy on our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-futuramedbold mb-4 text-brown-custom">Contact Us</h2>
          <p className="font-futurabold">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <address className="not-italic font-futurabold">
             
            <br />vitapharmab@gmail.com
            <br />+254 708 738 083
            <br />P.O BOX 10063-00100,
            <br/>  Adlife, Kilimani branch,  
          </address>
        </section>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
