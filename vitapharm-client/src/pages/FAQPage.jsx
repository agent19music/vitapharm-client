import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Footer from '../components/ModernFooter';
import Header from '../components/Header'

const faqData =[
  
  {
    question: "Do you offer consultations to help me choose the right skincare products?",
    answer: "Yes, we offer complimentary skin consultations with our knowledgeable staff. They can assess your skin, discuss your concerns, and recommend products tailored to your needs."
  },
  {
    question: "What types of massages do you offer, and what are the benefits?",
    answer: "We offer a variety of massage techniques, including Swedish massage for relaxation, deep tissue massage for muscle tension. Each type of massage has unique benefits, and our therapists can help you choose the best one for your needs."
  },
  {
    question: "Do I need to book an appointment for a massage or facial?",
    answer: "We highly recommend booking appointments in advance, especially for massages and facials, as our schedule can fill up quickly. However, we'll always do our best to accommodate walk-ins if there's availability."
  },
  {
    question: "Do you offer any specials or packages for skincare services?",
    answer: "Yes, we often have special promotions and packages that combine multiple services or products at a discounted price. Be sure to check our website or inquire in-store for current offers."
  }
];
const FAQPage = () => {
    const [expanded, setExpanded] = useState(null);

    const toggleFAQ = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div>
        <Header/>
        <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="flex flex-col text-left basis-1/2">
                <p className="inline-block font-futuramedbold text-primary mb-4">Vitapharm FAQ</p>
                <p className="sm:text-4xl text-3xl font-futuramedbold text-base-content">Frequently Asked Questions</p>
            </div>
            <ul className="basis-1/2">
                {faqData.map((item, index) => (
                    <li key={index}>
                        <button
                            className="relative flex gap-2 items-center w-full py-5 text-base font-futuramedbold text-left border-t md:text-lg border-base-content/10"
                            aria-expanded={expanded === index ? "true" : "false"}
                            onClick={() => toggleFAQ(index)}
                            style={{ 
                                outline: 'none',
                                boxShadow: 'none',
                                border: 'none'
                            }}
                        >
                            <span className="flex-1 text-base-content">{item.question}</span>
                            {expanded === index ? (
                                <ChevronDownIcon boxSize={8} />  
                            ) : (
                                <ChevronRightIcon boxSize={8} /> 
                            )}
                        </button>
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded === index ? "max-h-screen" : "max-h-0"}`}
                            style={{ transition: "max-height 0.3s ease-in-out 0s" }}
                        >
                            <div className="pb-5 leading-relaxed">
                                <div className="space-y-2 font-futurabold leading-relaxed">{item.answer}</div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <Footer/>
        </div>
    );
};

export default FAQPage;
