import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';
import Footer from '../components/ModernFooter';

const faqData = [
    {
        question: 'How secure is my insurance information?',
        answer: 'We prioritize the security of your insurance information. We use advanced encryption and strict data protection measures to ensure your data is safe and confidential.'
    },
    {
        question: 'How can I customize my insurance coverage?',
        answer: 'Our insurance plans are customizable. You can tailor your coverage to meet your specific needs and budget.'
    },
    {
        question: 'Is there a waiting period for insurance claims?',
        answer: 'There may be a waiting period for certain insurance claims, depending on the policy terms and conditions. Please refer to your policy documents for details.'
    }
];

const FAQPage = () => {
    const [expanded, setExpanded] = useState(null);

    const toggleFAQ = (index) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div>
        <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="flex flex-col text-left basis-1/2">
                <p className="inline-block font-semibold text-primary mb-4">Vitapharm FAQ</p>
                <p className="sm:text-4xl text-3xl font-extrabold text-base-content">Frequently Asked Questions</p>
            </div>
            <ul className="basis-1/2">
                {faqData.map((item, index) => (
                    <li key={index}>
                        <button
                            className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
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
                                <div className="space-y-2 leading-relaxed">{item.answer}</div>
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
