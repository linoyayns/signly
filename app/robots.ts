import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/contract", "/payment", "/payment-complete", "/test-email"],
      },
    ],
    sitemap: "https://www.mysignly.com/sitemap.xml",
  };
}
