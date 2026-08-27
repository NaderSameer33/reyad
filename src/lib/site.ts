/**
 * Single source of truth for the site's base URL.
 * Set NEXT_PUBLIC_SITE_URL in your environment (Vercel → Settings → Environment Variables)
 * to override the default. Change this to your custom domain once purchased.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reyad-alpha.vercel.app";
