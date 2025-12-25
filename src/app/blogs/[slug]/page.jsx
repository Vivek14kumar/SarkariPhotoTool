import { examRules } from "@/lib/examRules";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return Object.keys(examRules).map((key) => ({
    slug: `${key}-photo-signature-size`,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return {};

  const key = slug.split("-photo-signature-size")[0];
  const exam = examRules[key];
  if (!exam) return {};

  return {
    title: `${exam.name} Photo & Signature Size 2025 | Free Resizer`,
    description: `Check ${exam.name} photo size, signature size, dimensions, background rules.`,
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  if (!slug) return notFound();

  const key = slug.split("-photo-signature-size")[0];
  const exam = examRules[key];
  if (!exam) return notFound();

  return (
    <article className="max-w-4xl mx-auto p-6 md:p-8 space-y-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/blogs" },
            { label: `${exam.name} Photo & Signature Size` },
          ]}
        />
      </div>
        
      {/* Header */}
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          {exam.name} Photo & Signature Size
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Candidates applying for <strong>{exam.name}</strong> must upload their
          photo and signature strictly according to official guidelines.
        </p>
      </header>
        
      {/* Photo Card */}
      <section className="rounded-2xl bg-white/70 backdrop-blur border shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          📸 Photo Requirements
        </h2>
        
        <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
          <li className="bg-gray-50 rounded-lg p-4">
            <span className="font-medium">Format</span>
            <div>JPG / JPEG</div>
          </li>
        
          <li className="bg-gray-50 rounded-lg p-4">
            <span className="font-medium">File Size</span>
            <div>
              {exam.photo.minKB}KB – {exam.photo.maxKB}KB
            </div>
          </li>
        
          <li className="bg-gray-50 rounded-lg p-4">
            <span className="font-medium">Dimensions</span>
            <div>
              {exam.photo.width} × {exam.photo.height} pixels
            </div>
          </li>
        
          <li className="bg-gray-50 rounded-lg p-4">
            <span className="font-medium">Background</span>
            <div>{exam.photo.bg}</div>
          </li>
        </ul>
      </section>
        
      {/* Signature Card */}
      {exam.sign && (
        <section className="rounded-2xl bg-white/70 backdrop-blur border shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            ✍️ Signature Requirements
          </h2>
    
          <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <li className="bg-gray-50 rounded-lg p-4">
              <span className="font-medium">Format</span>
              <div>JPG / JPEG</div>
            </li>
    
            <li className="bg-gray-50 rounded-lg p-4">
              <span className="font-medium">File Size</span>
              <div>
                {exam.sign.minKB}KB – {exam.sign.maxKB}KB
              </div>
            </li>
    
            <li className="bg-gray-50 rounded-lg p-4 sm:col-span-2">
              <span className="font-medium">Background</span>
              <div>White</div>
            </li>
          </ul>
        </section>
      )}
    
      {/* CTA */}
      <div className="text-center pt-4">
        <a
          href="/photo-resizer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl
          bg-gradient-to-r from-blue-600 to-indigo-600
          text-white font-semibold shadow-lg
          hover:scale-105 transition-transform"
        >
          Resize {exam.name} Photo Now
        </a>
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
                item: "https://yourdomain.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blogs",
                item: "https://yourdomain.com/blogs",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${exam.name} Photo & Signature Size`,
                item: `https://yourdomain.com/blogs/${slug}`,
              },
            ],
          }),
        }}
      />
    </article>
  );
}
