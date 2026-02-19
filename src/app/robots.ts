import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: [] },
    sitemap: "https://eklavya-yadav.vercel.app/sitemap.xml",
  };
}
