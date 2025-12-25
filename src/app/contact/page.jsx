export const metadata = {
  title: "Contact Us | Photo & Signature Resizer Support",
  description:
    "Contact us for help with photo resizing, signature size, government exam image guidelines, and technical support.",
};

export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-14">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions about photo or signature size for government exams?
          We’re here to help you.
        </p>
      </section>

      {/* Content */}
      <section className="grid md:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">📩 Get in Touch</h2>
          <p className="text-gray-700">
            If you face any issue while resizing photos, signatures, or using
            our tools, feel free to contact us.
          </p>

          <div className="space-y-3 text-gray-700">
            <p>📧 Email: <strong>viktechz@example.com</strong></p>
            <p>🌐 Website: <strong>SarkariPhotoTool.online</strong></p>
            <p>⏱ Response Time: Within 24–48 hours</p>
          </div>
        </div>

        {/* Form */}
        <form className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
