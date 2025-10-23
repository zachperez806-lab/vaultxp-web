"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Import HouseAd dynamically to avoid SSR issues
const HouseAd = dynamic(() => import("./HouseAd"), { ssr: false });

export default function SmartAd({ dataAdSlot = "1234567890", style = {} }) {
  const [adsenseLoaded, setAdsenseLoaded] = useState(false);

  useEffect(() => {
    try {
      // If the AdSense script is loaded, trigger it
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdsenseLoaded(true);
      }
    } catch (err) {
      console.warn("AdSense not ready, showing HouseAd instead");
      setAdsenseLoaded(false);
    }
  }, []);

  if (adsenseLoaded) {
    return (
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          margin: "16px 0",
          ...style,
        }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXX" // Replace with your publisher ID
        data-ad-slot={dataAdSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  }

  // fallback house ad
  return (
    <HouseAd
      headline="💰 Earn more with our top offers!"
      subtext="Install featured games or complete surveys to earn faster →"
      href="/offers"
    />
  );
}
