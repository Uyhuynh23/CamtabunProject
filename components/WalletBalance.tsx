"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

export default function WalletBalance() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }
    // Lấy balance từ Solana blockchain
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    connection.getBalance(new PublicKey(publicKey.toString()))
      .then(lamports => {
        const sol = lamports / 1e9;
        console.log("SOL Balance:", sol);
        setBalance(sol);
      })
      .catch(err => {
        console.error("Error fetching SOL balance:", err);
        setBalance(null);
      });
  }, [publicKey]);

  // In ra balance mỗi khi nó thay đổi
  console.log("Token Balance:", balance);
  
  if (!publicKey) return null;
  return (
    <div className="text-slate-200 font-semibold">
      SOL Balance: {balance !== null ? balance : "Loading..."}
    </div>
  );
}
