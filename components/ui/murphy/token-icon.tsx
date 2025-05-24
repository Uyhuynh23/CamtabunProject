"use client";

import React from "react";

import { SolAsset } from "@/types/assets";

type IconProps = {
  asset: SolAsset | null;
  size?: number;
};

const TokenIcon = ({ asset, size = 24 }: IconProps) => {
  return (
    <div
      className="relative shrink-0 rounded-full border border-border bg-background p-0"
      style={{
        width: size + 2,
        height: size + 2,
      }}
    >
      <img
        src={asset?.image ?? ""}
        alt={asset?.symbol ?? asset?.mint.toBase58() ?? ""}
        width={size}
        height={size}
        className="absolute inset-0 rounded-full mt-0"
        style={{
          width: size,
          height: size,
        }}
      />
    </div>
  );
};

export { TokenIcon };