export const metadata = {
  title: "Privacy Policy & Terms | Photo & Signature Resizer",
  description:
    "Read our privacy policy and terms of use for photo resizing and government exam image tools.",
};

export default function PrivacyTermsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* 🔹 Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 
          bg-gradient-to-r from-blue-600 to-indigo-600 
          bg-clip-text text-transparent">
          Privacy Policy & Terms
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We respect your privacy and believe in transparency. Please review how
          we handle data and the terms for using our tools.
        </p>
      </header>

      {/* 🔹 Content Card */}
      <section className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-md">
        
        {/* Privacy Policy */}
        <h2 className="flex items-center gap-2">
          🔐 <span>Privacy Policy</span>
        </h2>
        <ul>
          <li>We do <strong>not store</strong> uploaded photos or signatures.</li>
          <li>All image processing happens locally in your browser.</li>
          <li>No login, registration, or personal information is required.</li>
          <li>We do not share or sell any user data to third parties.</li>
        </ul>

        {/* Terms */}
        <h2 className="flex items-center gap-2 mt-8">
          📄 <span>Terms of Use</span>
        </h2>
        <ul>
          <li>All tools on this website are provided completely free of cost.</li>
          <li>
            Users are responsible for verifying image size requirements from
            official exam notifications.
          </li>
          <li>
            This website is <strong>not affiliated</strong> with any government
            authority or recruitment board.
          </li>
          <li>Use of this website is entirely at your own discretion.</li>
        </ul>

        {/* Disclaimer */}
        <h2 className="flex items-center gap-2 mt-8">
          ⚠ <span>Disclaimer</span>
        </h2>
        <p>
          Examination authorities may update photo and signature requirements at
          any time. We recommend verifying official notifications before final
          submission.
        </p>

        {/* Contact */}
        <div className="mt-8 p-4 rounded-lg border border-blue-200 bg-blue-50">
          <p className="mb-1 font-medium">
            Need help or have concerns?
          </p>
          <p className="text-sm text-gray-600">
            Please reach out via our <strong>Contact Us</strong> page.
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-10 text-center">
          Last updated: {new Date().getFullYear()}
        </p>
      </section>
    </main>
  );
}
