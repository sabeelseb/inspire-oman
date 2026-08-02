"use client";

import React from "react";

/** Findown mark for Payload admin login / nav — preserve aspect ratio. */
export default function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logos/findown-logo.png"
      alt="Findown"
      style={{
        height: 40,
        width: "auto",
        maxWidth: 40,
        display: "block",
        objectFit: "contain",
        objectPosition: "center",
      }}
    />
  );
}
