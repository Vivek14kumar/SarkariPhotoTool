import ToolCard from "@/components/ToolCard";
import FAQPage from "./faq/page";
import TrustStats from "./TrustStats/page";
import VisitExamNotifications from "./VisitExamNotifications/page";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Sarkari Exam Form <br />
            <span className="text-yellow-300">
               Photo & Signature Resizer
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-blue-100">
            SSC, UPSC, IBPS, BPSC, Bihar Police, Railway & all exam-ready image tools —
            fast, secure & 100% free.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              href="/photo-resizer"
              className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
            >
              Start Resizing 🚀
            </Link>

            <Link
              href="#tools"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              View Tools
            </Link>
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              href="/bulk-resizer"
              className="inline-flex items-center gap-2 px-6 py-3 
              rounded-full font-bold text-white 
              bg-gradient-to-r from-yellow-400 to-orange-500
              shadow-lg hover:scale-105 transition"
            >
              ⚡ Bulk Photo Resize
              <span className="text-xl">→</span>
            </Link>
          </div>

        </div>
      </section>

      {/* TOOLS SECTION */}
      <section
        id="tools"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          All-in-One Government Image Tools
        </h2>

        <p className="text-center mt-4 text-gray-600 max-w-2xl mx-auto">
          Built specially for Indian government exam & document requirements.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14">
          <ToolCard title="Photo Resizer" link="/photo-resizer" />
          <ToolCard title="Signature Resizer" link="/signature-resizer" />
          <ToolCard title="Photo + Signature Merger" link="/merger" />
          <ToolCard title="Photo + Name & Date" link="/nameDatemerger" />
          <ToolCard title="Bulk Image Resizer" link="/bulk-resizer" />
        </div>
      </section>
      
      <VisitExamNotifications/>
      {/* TRUST STATS */}
      <TrustStats />

      {/* FAQ */}
      <FAQPage />
    </>
  );
}
