import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap{
    return [
        {
            url : 'https://www.innoveda.tech',
            lastModified : new Date(),
            changeFrequency : 'monthly',
            priority : 1,
        },
        {
            url : 'https://www.innoveda.tech/social-share',
            lastModified : new Date(),
            changeFrequency : 'weekly',
            priority : 0.8,
        },
        {
            url : 'https://www.innoveda.tech/convert-from-jpg',
            lastModified : new Date(),
            changeFrequency : 'weekly',
            priority : 0.8,
        },
        {
            url : 'https://www.innoveda.tech/background-remover',
            lastModified : new Date(),
            changeFrequency : 'weekly',
            priority : 0.8,
        },
    ]
}