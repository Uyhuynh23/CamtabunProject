"use client";
import { useParams, useRouter } from "next/navigation";
import { marketplaceVouchers } from "@/app/data/mockVouchers";
import { mockUsers } from "@/app/data/mockUsers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Wallet } from "lucide-react";
import React, { useState } from "react";
import { ConnectWalletButton } from "@/components/ui/murphy/connect-wallet-button";
import WalletBalance from "@/components/WalletBalance"
import { WalletProvider } from "@/components/providers/wallet-provider"

// Fake current user (replace with real auth in production)
const currentUser = { username: "nguyenvana", displayName: "Nguyễn Văn A", email: "nguyenvana" };

export default function VoucherDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const voucher = marketplaceVouchers.find(v => v.id === Number(id));
  const [solBalance, setSolBalance] = useState(1.0);
  const [myVouchers, setMyVouchers] = useState<any[]>(marketplaceVouchers.filter(v => v.owner?.username === currentUser.username));
  const [message, setMessage] = useState("");
  const [showSell, setShowSell] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [sellPrice, setSellPrice] = useState('');
  const [sellContact, setSellContact] = useState('');
  const [giftTo, setGiftTo] = useState('');
  const [giftError, setGiftError] = useState('');

  if (!voucher) return <div className="text-center mt-10 text-red-500">Voucher not found.</div>;

  const isOwner = voucher.owner?.username === currentUser.username;

  // Buy from publisher
  const handleBuyFromPublisher = () => {
    if (solBalance < voucher.price) {
      setMessage("Not enough SOL!");
      return;
    }
    setSolBalance(bal => +(bal - voucher.price).toFixed(3));
    voucher.owner = { ...currentUser };
    setMyVouchers([...myVouchers, voucher]);
    setMessage("Purchase successful!");
    setTimeout(() => setMessage(""), 2000);
  };

  // Buy from resale
  const handleBuyFromResale = (item: any) => {
    if (solBalance < item.price) {
      setMessage("Not enough SOL!");
      return;
    }
    setSolBalance(bal => +(bal - item.price).toFixed(3));
    voucher.owner = { ...currentUser };
    voucher.resaleList = voucher.resaleList.filter((r: any) => r.username !== item.username);
    setMyVouchers([...myVouchers, voucher]);
    setMessage("Resale purchase successful!");
    setTimeout(() => setMessage(""), 2000);
  };

  // Sell
  const handleSell = () => {
    if (!sellPrice || isNaN(Number(sellPrice))) return;
    voucher.resaleList = voucher.resaleList || [];
    voucher.resaleList.push({
      username: currentUser.username,
      displayName: currentUser.displayName,
      contact: sellContact,
      price: Number(sellPrice),
    });
    setShowSell(false);
    setSellPrice('');
    setSellContact('');
    setMessage("Listed on resale market!");
    setTimeout(() => setMessage(""), 2000);
  };

  // Gift
  const handleGift = () => {
    const user = mockUsers.find(u => u.email === giftTo || (u as any).username === giftTo);
    if (!user) {
      setGiftError("User not found!");
      return;
    }
    voucher.owner = {
      username: (user as any).username || user.email,
      displayName: user.displayName,
      email: user.email
    };
    setShowGift(false);
    setGiftTo('');
    setGiftError('');
    setMyVouchers(myVouchers.filter(v => v.id !== voucher.id));
    setMessage("Gifted successfully!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      
      {message && (
        <div className="mb-4 text-center text-green-600 font-semibold">{message}</div>
      )}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-purple-700 hover:text-pink-500 font-semibold transition"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Back
      </button>

      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
        <img
          src={voucher.image ? voucher.image : "/images/default.png"}
          alt={voucher.name}
          className="w-full h-72 object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">{voucher.name}</h1>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 rounded-xl px-4 py-2 shadow-lg flex flex-col items-end">
          <span className="text-pink-600 font-bold text-3xl">{voucher.discount}% OFF</span>
        </div>
      </div>

      {/* Main info */}
      <Card className="rounded-2xl shadow-lg border-0 mb-8 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4 text-gray-700 text-lg">{voucher.description}</div>
            <ul className="space-y-2 text-base text-gray-700">
              <li><span className="font-semibold text-purple-700">Valid until:</span> {voucher.expiryDate}</li>
              <li><span className="font-semibold text-purple-700">Location:</span> {voucher.location}</li>
              <li><span className="font-semibold text-purple-700">Terms:</span> {voucher.terms}</li>
              <li><span className="font-semibold text-purple-700">Valid days:</span> {voucher.validDays}</li>
              <li><span className="font-semibold text-purple-700">Category:</span> {voucher.category}</li>
              <li><span className="font-semibold text-purple-700">Contact:</span> {voucher.contact}</li>
              <li><span className="font-semibold text-purple-700">Highlight:</span> {voucher.highlight}</li>
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            {(
              <>
                <Button
                  size="lg"
                  className="w-60 text-xl py-6 bg-gradient-to-r from-blue-500 to-pink-500 font-bold rounded-2xl shadow-lg hover:scale-105 transition"
                  onClick={handleBuyFromPublisher}
                >
                  Buy for {voucher.price.toLocaleString()} SOL
                </Button>
                <div className="text-sm text-gray-500 mt-2 text-center">
                  (Buy directly from publisher)
                </div>
              </>
            )}
            {isOwner && (
              <div className="w-45 mt-6 flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full border-purple-400 text-purple-700 font-semibold rounded-2xl"
                  onClick={() => setShowSell(true)}
                >
                  Sell your voucher
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-cyan-400 text-cyan-700 font-semibold rounded-2xl"
                  onClick={() => setShowGift(true)}
                >
                  Gift your voucher
                </Button>
                {showSell && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    onClick={() => setShowSell(false)}
                  >
                    <div
                      className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative"
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
                        onClick={() => setShowSell(false)}
                      >
                        ×
                      </button>
                      <div className="mb-2 font-semibold text-lg text-purple-700">Sell your voucher</div>
                      <input
                        type="number"
                        placeholder="Price (SOL)"
                        value={sellPrice}
                        onChange={e => setSellPrice(e.target.value)}
                        className="mb-2 w-full px-3 py-2 rounded border"
                      />
                      <input
                        type="text"
                        placeholder="Your contact"
                        value={sellContact}
                        onChange={e => setSellContact(e.target.value)}
                        className="mb-4 w-full px-3 py-2 rounded border"
                      />
                      <Button className="w-full" onClick={handleSell}>Confirm Sell</Button>
                    </div>
                  </div>
                )}
                {showGift && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    onClick={() => setShowGift(false)}
                  >
                    <div
                      className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative"
                      onClick={e => e.stopPropagation()}
                    >
                      <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
                        onClick={() => setShowGift(false)}
                      >
                        ×
                      </button>
                      <div className="mb-2 font-semibold text-lg text-cyan-700">Gift your voucher</div>
                      <input
                        type="text"
                        placeholder="Recipient username or email"
                        value={giftTo}
                        onChange={e => setGiftTo(e.target.value)}
                        className="mb-2 w-full px-3 py-2 rounded border"
                      />
                      {giftError && <div className="text-red-500 text-sm mb-2">{giftError}</div>}
                      <Button className="w-full" onClick={handleGift}>Confirm Gift</Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resale list */}
      <Card className="rounded-2xl shadow border-0 bg-white/90">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
            <Gift className="w-6 h-6 text-pink-400" /> Resale Market
          </h2>
          {voucher.resaleList && voucher.resaleList.length > 0 ? (
            <div className="space-y-4">
              {voucher.resaleList.map(item => (
                <div
                  key={item.username}
                  className="flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-r from-purple-50 via-white to-pink-50 rounded-xl p-4 border border-purple-100 shadow"
                >
                  <div>
                    <div className="font-semibold text-purple-700">{item.displayName} ({item.username})</div>
                    <div className="text-gray-600 text-sm">Contact: {item.contact}</div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 md:mt-0">
                    {item.username === currentUser.username ? (
                      <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#22c55e"/><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Your listing
                      </span>
                    ) : (
                      <Button
                        className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg px-6 py-2 text-base font-semibold shadow hover:scale-105 transition"
                        onClick={() => handleBuyFromResale(item)}
                      >
                        Buy for {item.price.toLocaleString()} SOL
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No user is reselling this voucher yet.</div>
          )}
        </CardContent>
      </Card>

      
    </div>
  );
}