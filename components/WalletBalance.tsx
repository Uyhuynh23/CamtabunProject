"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export default function WalletBalance() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }
    fetch("/api/user-balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress: publicKey.toString() }),
    })
      .then(async res => {
        if (!res.ok) {
          console.error("API error:", res.status);
          return { tokenBalance: 104 };
        }
        return res.json();
      })
      .then(data => {
        // Nếu data.tokenBalance là undefined hoặc null, fallback về 100
        const balance = typeof data.tokenBalance === "number" ? data.tokenBalance : 100;
        console.log("API tokenBalance:", balance);
        setBalance(balance);
      });
  }, [publicKey]);


   // In ra balance mỗi khi nó thay đổi
  console.log("Token Balance:", balance);
  
  if (!publicKey) return null;
  return (
    <div className="text-slate-200 font-semibold">
      Token Balance: {balance !== null ? balance : "Loading..."}
    </div>
  );
}

