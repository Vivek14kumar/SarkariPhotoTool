import { examRules } from "@/lib/examRules";

export default function sitemap() {
  const baseUrl = "https://sarkariphototool.online";

  const staticPages = [
    "",
    "/blogs",
    "/faq",
    "/photo-resizer",
    "/signature-resizer",
    "/bulk-photo-resizer",
    "/photo-signature-merge",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogPages = Object.keys(examRules).map((key) => ({
    url: `${baseUrl}/blogs/${key}-photo-signature-size`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...blogPages];
}
