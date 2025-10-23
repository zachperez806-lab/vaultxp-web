"use client";
import { useEffect } from "react";

export default function AdSlot({ dataAdSlot, style = {} }) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", margin: "16px 0", ...style }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXX"   // <-- replace with your AdSense publisher ID
      data-ad-slot={dataAdSlot}                 // <-- replace with your slot ID
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
