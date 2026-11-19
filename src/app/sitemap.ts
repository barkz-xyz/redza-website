import type { MetadataRoute } from 'next';
import { siteUrl } from './site-url';
import { rampPath, refrigeratedPath } from './service-links';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }, { url: siteUrl + rampPath }, { url: siteUrl + refrigeratedPath }];
}
