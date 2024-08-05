import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://resume-builder.angelsaikia.com",
      lastModified: new Date().toISOString()
    }
  ];
}
