"use client"
import { VoucherMintForm } from "@/components/ui/murphy/voucher-mint-form";
import { WalletProvider } from "@/components/providers/wallet-provider";

export default function MyPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200 p-0 flex items-center justify-center"
    >
      <WalletProvider>
        <VoucherMintForm />
      </WalletProvider>
    </div>
  );
}