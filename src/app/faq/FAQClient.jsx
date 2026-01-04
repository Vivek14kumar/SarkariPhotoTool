"use client";

import { useState } from "react";

export default function FAQClient() {
  const faqs = [
    {
      question: "What is the correct photo size for government exams?",
      answer:
        "Photo size varies by exam. Most government exams like SSC, UPSC, Railway require photos between 20KB–300KB with specific pixel dimensions and background color.",
    },
    {
      question: "What is the correct signature size for online forms?",
      answer:
        "Signature size usually ranges between 10KB–50KB in JPG/JPEG format with a white background. Exact size depends on the exam.",
    },
    {
      question: "What is the IGNOU photo size for 2026 admission?",
      answer:"Photo size should be between 20 KB to 100 KB in JPG/JPEG format.",
    },
    {
      question:"Is signature compulsory for IGNOU?",
      answer:"Yes, signature upload is mandatory for most IGNOU forms.",
    },
    {
      question:"What photo size is required for BPSC?",
      answer:"20–50 KB JPG with white background.",
    },
    {
      question:"Can mobile photo be used?",
      answer:"Yes, if it meets size & background requirements.",
    },
    {
      question:"Can I edit my photo after form submission?",
      answer:"No. Always upload the correct size photo & signature."
    },
    {
      question: "Can I resize photo and signature online for free?",
      answer:
        "Yes. Sarkari Photo Tool allows free online photo and signature resizing without watermark or signup.",
    },
    {
      question: "What happens if photo or signature size is incorrect?",
      answer:
        "Incorrect size may cause application rejection during verification.",
    },
    {
      question: "Which image format is allowed for exam forms?",
      answer:
        "Most exams accept JPG or JPEG format only.",
    },
    {
      question: "Can I use a mobile photo for exam applications?",
      answer:
        "Yes, mobile photos are allowed if they meet size, clarity, and background rules.",
    },
    {
      question: "Is a blue background allowed for photos?",
      answer:
        "Some exams like Railway allow blue background, while others require white.",
    },
    {
      question: "Do Aadhaar and PAN card photos have different requirements?",
      answer:
        "Yes, Aadhaar and PAN card photos follow document-specific guidelines.",
    },
    {
      question:"What should be the photo size for UP Police Constable 2026?",
      answer:"The candidate’s photograph should be 180 × 225 pixels (approx.), in JPG/JPEG format, and the file size should be between 20 KB to 50 KB.",
    },
    {
      question:"Will a signature below 5 KB be accepted?",
      answer:"Yes, in most cases the UP Police portal accepts signatures below 5 KB if the dimensions (140×60 px) are correct and the signature is clear.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main className="max-w-5xl mx-auto p-6 mt-8">
      <h1 className="text-4xl font-extrabold text-primary mb-10 text-center">
        Frequently Asked Questions (FAQ)
      </h1>

      <section className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left p-6 flex justify-between items-center"
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              <span className="text-2xl">
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>

            {openIndex === idx && (
              <div className="px-6 pb-6 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
