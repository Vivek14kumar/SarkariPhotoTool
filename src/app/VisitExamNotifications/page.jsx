"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function VisitExamNotifications() {
  const router = useRouter();

  return (
    <div className="p-4  bg-blue-50 rounded-2xl shadow-lg mx-2 mb-18 text-center border-l-4 border-yellow-500">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">
        📢 Track Government Exam Notifications
      </h2>
      <p className="text-gray-700 mb-6">
        Stay updated with latest exams, deadlines, official PDFs, and apply links in real-time for free.
      </p>
      <button
        onClick={() => window.open("https://resultshub.in")} // Replace with your page route
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Visit Results Hub
      </button>
      <p className="text-sm text-gray-500 mt-4">
        Powered by <a href="https://resultshub.in" target="_blank" className="text-blue-600 hover:underline">Resultshub</a>
      </p>
    </div>
  );
}
