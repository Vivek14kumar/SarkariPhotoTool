import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative mt-20 bg-white/60 backdrop-blur-lg border-t border-white/30">
      
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12
        grid gap-10
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-4
        text-sm text-gray-700
      ">
        {/* Brand */}
<div className="text-center sm:text-left">
  <Link href="/" className="inline-flex items-start gap-2">
    <Image
      src="/favicon.ico"
      alt="Sarkari Photo Tool Logo"
      width={32}
      height={32}
    />

    <div className="flex flex-col leading-tight">
      <h3 className="text-2xl font-extrabold text-gradient">
        Sarkari Photo Tool
      </h3>
      <span className="text-[10px] text-gray-500 italic">
        Photo & Signature Resize Tool
      </span>
    </div>
  </Link>

  <p className="mt-4 text-gray-600 leading-relaxed max-w-xs mx-auto sm:mx-0">
    Free online tools to resize photo & signature for government exam forms
    like SSC, UPSC, IBPS, Railway & more.
  </p>
</div>


        {/* Tools */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 text-center sm:text-left">
            Tools
          </h4>
          <ul className="space-y-3 text-center sm:text-left">
            {[
              ["Photo Resizer", "/photo-resizer"],
              ["Signature Resizer", "/signature-resizer"],
              ["Photo & Signature Merger", "/merger"],
              ["Add Name & Date", "/nameDatemerger"],
              ["Bulk Image Resizer", "/bulk-resizer"],
            ].map(([label, link]) => (
              <li key={label}>
                <Link
                  href={link}
                  className="inline-block hover:text-blue-600 transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Exams */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 text-center sm:text-left">
            Exam Presets
          </h4>
          <ul className="space-y-3 text-center sm:text-left">
            {[
              ["SSC Photo Size", "/blogs/ssc-photo-signature-size"],
              ["UPSC Photo Size", "/blogs/upsc-photo-signature-size"],
              ["Railway", "/blogs/railway-photo-signature-size"],
            ].map(([label, link]) => (
              <li key={label}>
                <Link
                  href={link}
                  className="inline-block hover:text-purple-600 transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 text-center sm:text-left">
            Legal
          </h4>
          <ul className="space-y-3 text-center sm:text-left">
            {[
              ["About Us", "/about"],
              ["Privacy Policy", "/privacy-policy"],
              ["Terms & Conditions", "/terms"],
              ["Contact", "/contact"],
            ].map(([label, link]) => (
              <li key={label}>
                <Link
                  href={link}
                  className="inline-block hover:text-pink-600 transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
<div className="border-t border-white/30 py-4 px-4 mb-10">
  <p className="text-center text-xs sm:text-sm text-gray-600 leading-relaxed">
    © {new Date().getFullYear()}{" "}
    <span className="font-semibold text-gradient">Sarkari Photo Tool</span>.  
    All rights reserved.
    <span className="hidden sm:inline mx-2">|</span>
    <span className="block sm:inline">
      Designed &amp; Maintained by{" "}
      <a
        href="mailto:viktechz@example.com"
        className="text-blue-500 hover:text-blue-600 font-semibold"
        aria-label="Email VIKTECHZ"
      >
        VIKTECHZ
      </a>
    </span>
  </p>
</div>

    </footer>
  );
}
