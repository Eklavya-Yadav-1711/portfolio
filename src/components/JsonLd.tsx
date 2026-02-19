const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://eklavya-yadav-1711.vercel.app");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eklavya Yadav",
  url: siteUrl,
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer. I write code by night, chase the cosmos by dream. Building things that matter.",
  sameAs: [
    "https://github.com/Eklavya-Yadav-1711",
    "https://www.linkedin.com/in/eklavya-yadav",
  ],
  email: "rajeklavya65@gmail.com",
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
