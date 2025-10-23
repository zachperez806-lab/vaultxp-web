"use client";
import { useEffect } from "react";

/**
 * Generic Google AdSense ad slot.
 *  - `dataAdSlot`: your slot ID (string or number)
 *  - `style`: optional custom inline styles
 *
 * NOTE:
 *  1. Replace `ca-pub-XXXXXXXXXXXXXXX` with your AdSense publisher ID.
 *  2. Replace `dataAdSlot` values in pages with your actual ad-slot IDs.
 *  3. Until AdSense is approved, this will just render an empty block.
 */
export default function AdSlot({ dataAdSlot, style = {} }) {
  useEffect(() => {
    try {
      // trigger AdSense script to fill this slot
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.warn("AdSense push failed:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", margin: "16px 0", ...style }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXX"   // <-- replace with your publisher ID
      data-ad-slot={dataAdSlot}                 // <-- replace with slot ID when using
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
