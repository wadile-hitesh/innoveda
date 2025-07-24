import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap{
    return [
        {
            url : 'https://innoveda.tech',
            lastModified : new Date(),
            changeFrequency : 'monthly',
            priority : 1,
        },
        {
            url : 'https://innoveda.tech/social-share',
            lastModified : new Date(),
            changeFrequency : 'weekly',
            priority : 0.8,
        },
        {
            url : 'https://innoveda.tech/convert-from-jpg',
            lastModified : new Date(),
            changeFrequency : 'weekly',
            priority : 0.8,
        },
        {
            url : 'https://innoveda.tech/background-remover',
            lastModified : new Date(),
            changeFrequency : 'weekly',
            priority : 0.8,
        },
    ]
}