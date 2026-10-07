import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yareli.net";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-02-13"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/merframe`,
      lastModified: new Date("2026-10-08"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/relay`,
      lastModified: new Date("2026-09-26"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
