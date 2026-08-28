import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pramaan-relay.vercel.app";
  return ["", "/relay", "/how-it-works", "/evidence"].map((path, index) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-08-28"),
    changeFrequency: index === 1 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : index === 1 ? 0.9 : 0.7,
  }));
}
