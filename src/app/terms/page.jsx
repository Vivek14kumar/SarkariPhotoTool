export const metadata = {
  title: "Terms & Conditions | Photo & Signature Resizer",
  description:
    "Read the terms and conditions for using our free photo and signature resizing tools for government exam applications.",
};

export default function TermsConditionsPage() {
  return (
    <main className="bg-gray-50">
      {/* 🔹 Hero Section */}
      <section>
  <div className="max-w-5xl mx-auto px-6 py-14 text-center">
    <h1 className="text-4xl font-bold mb-4 
      bg-gradient-to-r from-blue-600 to-indigo-600 
      bg-clip-text text-transparent">
      Terms & Conditions
    </h1>

    <p className="text-lg text-gray-600">
      Please read these terms carefully before using our tools
    </p>
  </div>
</section>

      {/* 🔹 Content Section */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none bg-white p-8 rounded-xl shadow-md">
          <p>
            Welcome to <strong>Sarkari Photo Tool</strong>. By accessing or using
            this website, you agree to comply with and be bound by the following
            terms and conditions. If you do not agree, please discontinue use of
            our services.
          </p>

          <h2>1. Use of Our Services</h2>
          <ul>
            <li>Our tools are provided free of charge.</li>
            <li>They are intended for personal and lawful use only.</li>
            <li>
              Any attempt to misuse, reverse-engineer, or disrupt the website is
              strictly prohibited.
            </li>
          </ul>

          <h2>2. Accuracy of Information</h2>
          <p>
            We aim to keep exam-related photo and signature requirements
            accurate. However, official authorities may update their guidelines
            at any time. Users are advised to verify details from official exam
            notifications.
          </p>

          <h2>3. Privacy & Data Handling</h2>
          <ul>
            <li>
              <strong>No image or personal data is stored</strong> on our
              servers.
            </li>
            <li>All image processing happens directly in your browser.</li>
            <li>No login or account creation is required.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All website content, tools, UI design, and branding belong to{" "}
            <strong>Sarkari Photo Tool</strong>. Unauthorized copying,
            redistribution, or commercial use is prohibited.
          </p>

          <h2>5. Disclaimer</h2>
          <p>
            This website is <strong>not affiliated</strong> with any government
            authority, recruitment board, or examination body. All tools are
            provided on an “as-is” basis without warranties.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            We shall not be responsible for any loss, rejection, or damage
            arising from the use of our tools or reliance on the information
            provided.
          </p>

          <h2>7. External Links</h2>
          <p>
            Our website may contain links to third-party websites. We do not
            control or take responsibility for their content or policies.
          </p>

          <h2>8. Changes to These Terms</h2>
          <p>
            We reserve the right to update or modify these terms at any time.
            Continued use of the website implies acceptance of the revised
            terms.
          </p>

          <h2>9. Contact Us</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="mb-1">
              📧 Email:
              <strong className="ml-1">viktechz@example.com</strong>
            </p>
            <p className="text-sm text-gray-600">
              For questions, feedback, or legal concerns
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-8 text-center">
            Last updated: {new Date().getFullYear()}
          </p>
        </div>
      </section>
    </main>
  );
}
