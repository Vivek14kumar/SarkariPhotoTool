export function GET() {
  const content = `
User-agent: *
Allow: /

# Allow essential assets
Allow: /_next/static/
Allow: /_next/image/

# Sitemap
Sitemap: https://sarkariphototool.online/sitemap.xml
  `.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
