import Script from "next/script";

export const UmamiAnalytics = () => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_URL;

  if (!websiteId || !umamiSrc) return null;

  return <Script src={umamiSrc} data-website-id={websiteId} strategy="afterInteractive" />;
};
