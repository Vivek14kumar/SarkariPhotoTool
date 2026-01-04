import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "Sarkari Photo Tool",
  description:
    "Sarkari Exam Form Photo & Signature Resizer, Resize photo and signature for SSC, UPSC, IBPS, Aadhaar, PAN and all government forms online.",
    keywords: [
    "sarkari photo tool",
    "government photo resizer",
    "photo resize for government exam",
    "signature resize online",
    "ssc photo size",
    "upsc photo size",
    "ibps photo signature size",
    "railway photo resize",
    "aadhaar photo resize",
    "pan card photo size",
    "photo signature resize online",
    "govt exam photo tool",
    "photo rejected government form",
    "jpg photo resizer online",
    "sarkari exam photo resize",
    "ExamMint Resize",
    "canva",
    "BPSC TRE 4 photo size",
    "BPSC TRE 4 signature size",
    "BPSC teacher photo upload",
    "BPSC TRE image resize",
    "BPSC online form photo problem",
    "IGNOU photo size 2026",
    "IGNOU signature size",
    "IGNOU photo upload problem",
    "Resize IGNOU photo online",
    "IGNOU admission photo requirements",
    "UP Police Constable 2026 photo size",
    "UP Police Constable signature size",
    "UP Police photo and signature guidelines",
    "UP Police Constable image size",
    "UP Police online form photo size",
  ],
  };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen flex flex-col text-gray-800 overflow-x-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-300 animate-gradient-slow blur-3xl opacity-60 -z-10 pointer-events-none"></div>

        {/* Floating Blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none"></div>
        <LanguageProvider>
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        </LanguageProvider>
        <Analytics/>
      </body>
    </html>
  );
}

