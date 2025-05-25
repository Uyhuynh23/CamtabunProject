"use client";
import { useParams, useRouter } from "next/navigation";
import { marketplaceVouchers } from "@/app/data/mockVouchers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import React, { useState } from "react";

// Fake current user (replace with real auth in production)
const currentUser = { username: "nguyenvana", displayName: "Nguyễn Văn A" };

export default function VoucherDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const voucher = marketplaceVouchers.find(v => v.id === Number(id));
  const [buying, setBuying] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [sellPrice, setSellPrice] = useState('');
  const [sellContact, setSellContact] = useState('');

  if (!voucher) return <div className="text-center mt-10 text-red-500">Voucher not found.</div>;

  const isOwner = voucher.owners?.some(o => o.username === currentUser.username);

  // Hàm xử lý bán lại
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
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
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
            <Button
              size="lg"
              className="w-60 text-xl py-6 bg-gradient-to-r from-blue-500 to-pink-500 font-bold rounded-2xl shadow-lg hover:scale-105 transition"
              onClick={() => setBuying(true)}
            >
              Buy for {voucher.price.toLocaleString()} SOL
            </Button>
            <div className="text-sm text-gray-500 mt-2 text-center">
              (Buy directly from publisher)
            </div>
            {buying && (
              <div className="text-green-600 font-semibold text-center">You have purchased this voucher!</div>
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
                  <div className="mt-2 text-sm text-purple-700">
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Selling price in SOL"
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                        className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Contact information"
                        value={sellContact}
                        onChange={(e) => setSellContact(e.target.value)}
                        className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                      <Button
                        className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg px-4 py-2 text-base font-semibold shadow hover:scale-105 transition"
                        onClick={handleSell}
                      >
                        Confirm Sale
                      </Button>
                    </div>
                  </div>
                )}
                {showGift && (
                  <div className="mt-2 text-sm text-cyan-700">[Gift form here]</div>
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
                    <Button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg px-6 py-2 text-base font-semibold shadow hover:scale-105 transition">
                      Buy for {item.price.toLocaleString()} SOL
                    </Button>
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