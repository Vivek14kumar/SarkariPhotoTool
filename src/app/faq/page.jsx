export const metadata = {
  title: "FAQ – Photo & Signature Size for Government Exams | Sarkari Photo Tool",
  description:
    "Frequently asked questions about photo size, signature size, image resizing, and government exam upload rules for SSC, UPSC, Railway & more.",
};

import FAQClient from "./FAQClient";

export default function FAQPage() {
  return(
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the correct photo size for government exams?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most government exams require photos between 20KB–300KB with specific dimensions."
                }
              }
            ]
          }),
        }}
      />
      <FAQClient />
    </>
  ); 
}
