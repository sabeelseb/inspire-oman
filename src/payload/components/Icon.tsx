"use client";

import React from "react";

/** Findown mark for Payload admin chrome / browser tab — keep square, never stretch. */
export default function Icon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logos/findown-favicon.png"
      alt="Findown"
      width={22}
      height={22}
      style={{
        height: 22,
        width: 22,
        display: "block",
        objectFit: "contain",
        objectPosition: "center",
      }}
    />
  );
}
