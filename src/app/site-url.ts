// Set SITE_URL once the custom domain serves the production site.
export const siteUrl = new URL(process.env.SITE_URL || 'https://redzaweb-codex.vercel.app').origin;
