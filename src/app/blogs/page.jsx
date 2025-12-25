import { examRules } from "@/lib/examRules";
import Link from "next/link";
import { FaUserGraduate, FaUniversity, FaIdCard, FaSchool, FaCertificate } from "react-icons/fa"; // example icons

export const metadata = {
  title: "Government Photo & Signature Size Guides (All Exams)",
  description:
    "Check photo and signature size for SSC, UPSC, Railway, Aadhaar, PAN card. Resize online instantly.",
};

// Mapping exam slugs to icons (you can add more)
const examIcons = {
  ssc: <FaUniversity className="text-white w-8 h-8" />,
  upsc: <FaUserGraduate className="text-white w-8 h-8" />,
  railway: <FaCertificate className="text-white w-8 h-8" />,
  aadhaar: <FaIdCard className="text-white w-8 h-8" />,
  pan: <FaIdCard className="text-white w-8 h-8" />,
  default: <FaSchool className="text-white w-8 h-8" />,
};

// Gradient backgrounds array for variety
const gradients = [
  "from-purple-500 to-indigo-500",
  "from-pink-500 to-orange-400",
  "from-green-400 to-teal-500",
  "from-blue-500 to-cyan-500",
  "from-yellow-400 to-orange-500",
];

export default function BlogsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-10">
      <h1 className="text-4xl font-extrabold text-center text-primary mb-12">
        Photo & Signature Size for Government Exams
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(examRules).map(([slug, exam], index) => (
          <Link
            key={slug}
            href={`/blogs/${slug}-photo-signature-size`}
            className={`group relative rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105`}
          >
            {/* Gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-80`}
            ></div>

            <div className="relative p-6 flex flex-col justify-between h-full text-white">
              <div className="flex items-center mb-4">
                {examIcons[slug] || examIcons.default}
                <h2 className="ml-4 text-2xl font-semibold">{exam.name}</h2>
              </div>
              <p className="text-white/90 mb-4">
                Photo size, signature size, format & background rules.
              </p>
              <span className="mt-auto font-medium underline group-hover:text-yellow-200">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
