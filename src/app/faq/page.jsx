"use client";

import { useState } from "react";

/*export const metadata = {
  title: "FAQ – Photo & Signature Size, Resizing & Exam Guidelines",
  description:
    "Frequently asked questions about photo size, signature size, image resizing, and government exam upload guidelines.",
};*/

export default function FAQPage() {
  const faqs = [
    {
      question: "What is the correct photo size for government exams?",
      answer:
        "Photo size varies by exam. Most government exams like SSC, UPSC, Railway require photos between 20KB–300KB with specific pixel dimensions and background color. Always check the exam-wise guidelines before uploading.",
    },
    {
      question: "What is the correct signature size for online forms?",
      answer:
        "Signature size usually ranges between 10KB–50KB in JPG/JPEG format with a white background. The exact size depends on the exam or document.",
    },
    {
      question: "Can I resize photo and signature online for free?",
      answer:
        "Yes. You can resize your photo and signature online for free using our photo and signature resizer tools without watermark or signup.",
    },
    {
      question: "What happens if photo or signature size is incorrect?",
      answer:
        "If the uploaded photo or signature does not meet the official requirements, your application may be rejected or marked invalid during verification.",
    },
    {
      question: "Which image format is allowed for exam forms?",
      answer:
        "Most exams accept JPG or JPEG format only. PNG and PDF formats are usually not allowed unless specified.",
    },
    {
      question: "Can I use a mobile photo for exam applications?",
      answer:
        "Yes, mobile photos are accepted as long as they meet the required size, clarity, background, and format mentioned in the exam notification.",
    },
    {
      question: "Is a blue background allowed for photos?",
      answer:
        "Some exams like Railway (RRB) allow blue backgrounds, while others require white background. Always check the specific exam rules.",
    },
    {
      question: "Do Aadhaar and PAN card photos have different requirements?",
      answer:
        "Yes. Aadhaar and PAN card photos have different size and dimension requirements compared to exam photos. Follow document-specific guidelines.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="max-w-5xl mx-auto p-6 mt-8">
      <h1 className="text-4xl font-extrabold text-primary mb-10 text-center">
        Frequently Asked Questions (FAQ)
      </h1>

      <section className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
            >
              <span className="text-xl font-semibold text-gray-800">
                {faq.question}
              </span>
              <span className="text-primary text-2xl font-bold">
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>

            <div
              className={`transition-max-height duration-500 ease-in-out overflow-hidden px-6 ${
                openIndex === idx ? "max-h-96 py-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
