import { examRules } from "@/lib/examRules";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return Object.keys(examRules).map((key) => ({
    slug: `${key}-photo-signature-size`,
  }));
}

function getRelatedExams(currentKey) {
  return Object.entries(examRules)
    .filter(([key]) => key !== currentKey)
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ FIX
  if (!slug) return {};

  const key = slug.replace("-photo-signature-size", "");
  const exam = examRules[key];
  if (!exam) return {};

  return {
    title: `${exam.name} Photo & Signature Size 2026 | Free Resizer`,
    description: `Check ${exam.name} photo size, signature size, dimensions, background rules and resize online for free.`,
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params; // ✅ FIX
  if (!slug) return notFound();

  const key = slug.replace("-photo-signature-size", "");
  const exam = examRules[key];
  if (!exam) return notFound();

  return (
    <article className="max-w-4xl mx-auto p-6 md:p-8 space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: `${exam.name} Photo & Signature Size` },
        ]}
      />

      {/* Header */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">
          {exam.name} Photo & Signature Size
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Candidates applying for <strong>{exam.name}</strong> must upload photo
          and signature strictly as per official guidelines.
        </p>
      </header>
      
      {/* Last Updated */}
  <p className="text-sm text-gray-500">
    Last Updated: {new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}
  </p>
  
{/* Quick Overview Table */}
<section className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md">
  <table className="w-full text-sm md:text-base">
    <tbody className="divide-y divide-gray-200">
      
      <tr className="hover:bg-blue-50 transition">
        <th className="px-5 py-4 text-left bg-gray-100 font-semibold text-gray-700 w-1/2">
          Exam Name
        </th>
        <td className="px-5 py-4 font-medium text-gray-900">
          {exam.name}
        </td>
      </tr>

      <tr className="hover:bg-green-50 transition">
        <th className="px-5 py-4 text-left bg-gray-100 font-semibold text-gray-700">
          Photo Size
        </th>
        <td className="px-5 py-4">
          <span className="inline-block rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
            {exam.photo.minKB}KB – {exam.photo.maxKB}KB
          </span>
        </td>
      </tr>

      <tr className="hover:bg-indigo-50 transition">
        <th className="px-5 py-4 text-left bg-gray-100 font-semibold text-gray-700">
          Photo Dimensions
        </th>
        <td className="px-5 py-4 text-gray-800">
          {exam.photo.width} × {exam.photo.height} px
        </td>
      </tr>

      <tr className="hover:bg-yellow-50 transition">
        <th className="px-5 py-4 text-left bg-gray-100 font-semibold text-gray-700">
          Photo Background
        </th>
        <td className="px-5 py-4 capitalize text-gray-800">
          {exam.photo.bg}
        </td>
      </tr>

      {exam.sign && (
        <tr className="hover:bg-purple-50 transition">
          <th className="px-5 py-4 text-left bg-gray-100 font-semibold text-gray-700">
            Signature Size
          </th>
          <td className="px-5 py-4">
            <span className="inline-block rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs font-semibold">
              {exam.sign.minKB}KB – {exam.sign.maxKB}KB
            </span>
          </td>
        </tr>
      )}

      <tr className="hover:bg-blue-50 transition">
        <th className="px-5 py-4 text-left bg-gray-100 font-semibold text-gray-700">
          Allowed Format
        </th>
        <td className="px-5 py-4">
          <span className="inline-block rounded-md bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
            JPG / JPEG
          </span>
        </td>
      </tr>

    </tbody>
  </table>
</section>

      {/* Photo */}
      <section className="rounded-2xl bg-white border shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">📸 Photo Requirements</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          <li>Format: JPG / JPEG</li>
          <li>
            File Size: {exam.photo.minKB}KB – {exam.photo.maxKB}KB
          </li>
          <li>
            Dimensions: {exam.photo.width} × {exam.photo.height}px
          </li>
          <li>Background: {exam.photo.bg}</li>
        </ul>
      </section>
      {exam.name === "BPSC TRE 4" && (
  <section className="rounded-2xl bg-yellow-50 border-l-4 border-yellow-500 p-6">
    <h2 className="text-2xl font-semibold mb-3">
      BPSC TRE 4 Photo & Signature Guidelines
    </h2>

    <p className="text-gray-700 leading-relaxed">
      Bihar Public Service Commission (BPSC) has released the notification for
      <strong> Teacher Recruitment Exam (TRE 4)</strong>. Candidates applying
      online must upload their photograph and signature as per BPSC norms.
      Any incorrect image size, format, or background may lead to rejection
      of the application form.
    </p>

    <ul className="list-disc ml-6 mt-4 text-gray-700">
      <li>Recent passport-size color photograph required</li>
      <li>White or light background only</li>
      <li>Face should be clearly visible without cap or sunglasses</li>
      <li>Signature must be done with black or blue pen</li>
      <li>Upload images in JPG/JPEG format only</li>
    </ul>

    <p className="mt-4 text-gray-700">
      Use our <strong>free BPSC TRE 4 photo & signature resizer</strong> to
      instantly adjust size, dimensions, and file KB without losing quality.
    </p>
  </section>
)}

      {/* Signature */}
      {exam.sign && (
        <section className="rounded-2xl bg-white border shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">
            ✍️ Signature Requirements
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            <li>Format: JPG / JPEG</li>
            <li>
              File Size: {exam.sign.minKB}KB – {exam.sign.maxKB}KB
            </li>
            <li className="sm:col-span-2">Background: White</li>
          </ul>
        </section>
      )}

      {/* CTA */}
      <div className="text-center">
        <a
          href="/photo-resizer"
          className="inline-block px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:scale-105 transition"
        >
          Resize {exam.name} Photo Now
        </a>
      </div>

      {/* Related Exams (Auto) */}
<div className="text-center text-sm text-gray-600 mt-8">
  <span className="font-medium">Related Exams:</span>{" "}
  {getRelatedExams(key).map(([examKey, examData], index) => (
    <span key={examKey}>
      <a
        href={`/blogs/${examKey}-photo-signature-size`}
        className="text-blue-600 hover:underline"
      >
        {examData.name}
      </a>
      {index < getRelatedExams(key).length - 1 && " | "}
    </span>
  ))}
</div>

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://sarkariphototool.online/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blogs",
                item: "https://sarkariphototool.online/blogs",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${exam.name} Photo & Signature Size`,
                item: `https://sarkariphototool.online/blogs/${slug}`,
              },
            ],
          }),
        }}
      />
    </article>
  );
}
