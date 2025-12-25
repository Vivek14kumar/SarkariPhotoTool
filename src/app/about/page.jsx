export const metadata = {
  title: "About Us | Free Photo & Signature Resizer for Government Exams",
  description:
    "Learn about our mission to help students and job aspirants resize photos and signatures easily for government exams like SSC, UPSC, Railway, Aadhaar, PAN card.",
};

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          About Us
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We help students and job aspirants prepare hassle-free applications by
          providing accurate photo and signature resizing tools for government
          exams.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">🎯 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Applying for government exams should not be complicated. Our
            mission is to eliminate confusion around photo and signature size
            requirements by providing simple, fast, and accurate tools — all in
            one place.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether it’s SSC, UPSC, Railway, Aadhaar, PAN Card, or any other form,
            we ensure your uploads meet official guidelines on the first try.
          </p>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white shadow-xl">
          <h3 className="text-2xl font-semibold mb-3">
            Why Thousands Trust Us
          </h3>
          <ul className="space-y-2">
            <li>✔ 100% Free & No Signup</li>
            <li>✔ Accurate Exam-wise Guidelines</li>
            <li>✔ Works on Mobile & Desktop</li>
            <li>✔ No Watermark</li>
          </ul>
        </div>
      </section>

      {/* What We Offer */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">🚀 What We Offer</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Photo Resizer",
              desc: "Resize exam photos to exact KB & pixel size instantly.",
            },
            {
              title: "Signature Resizer",
              desc: "Resize signatures with white background support.",
            },
            {
              title: "Photo + Signature Merger",
              desc: "Combine photo & signature into one image for exams.",
            },
            {
              title: "Exam Guidelines",
              desc: "Exam-wise photo & signature size rules explained.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Help */}
      <section className="rounded-2xl bg-gray-50 p-8 text-center space-y-4">
        <h2 className="text-3xl font-bold">👩‍🎓 Who We Help</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Our platform is designed for students, job seekers, and professionals
          applying for government exams, identity documents, and online
          applications where strict image rules apply.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center">
        <a
          href="/photo-resizer"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-xl
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white font-semibold shadow-lg
          hover:scale-105 transition-transform"
        >
          Start Resizing Now 🚀
        </a>
      </section>
    </main>
  );
}
