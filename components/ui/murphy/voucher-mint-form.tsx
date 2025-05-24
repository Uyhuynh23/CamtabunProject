'use client'
import { useState } from "react"
import { MintNFT } from "./mint-nft-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useWallet } from "@solana/wallet-adapter-react"
import { marketplaceVouchers } from "@/app/data/mockVouchers"
import { mockUsers } from "@/app/data/mockUsers"


export function VoucherMintForm() {
  const [form, setForm] = useState({
    name: "",
    PublisherEmail: "",
    description: "",
    discount: "",
    expiryDate: "",
    type: "",
    image: "",
    location: "",
    terms: "",
    usageLimit: "unlimited",
    validDays: "All week",
    category: "",
    contact: "",
    highlight: "",
    merchant: "",
    price: 0,
  })
  const [minting, setMinting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metadataUri, setMetadataUri] = useState<string | null>(null);
  const wallet = useWallet()
  

  // Upload metadata JSON as a file to Pinata public network
  async function uploadMetadataToPinata(metadata: any): Promise<string> {
    const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT
    if (!PINATA_JWT) {
      throw new Error("Missing Pinata JWT. Please set NEXT_PUBLIC_PINATA_JWT in your .env.local file.")
    }

    const blob = new Blob([JSON.stringify(metadata)], { type: "application/json" })
    const file = new File([blob], "metadata.json", { type: "application/json" })
    const formData = new FormData()
    formData.append("file", file)
    formData.append("network", "public")

    let retries = 2
    while (retries >= 0) {
      try {
        const res = await fetch("https://uploads.pinata.cloud/v3/files", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${PINATA_JWT}`,
          },
          body: formData,
        })
        if (!res.ok) {
          const errText = await res.text()
          throw new Error(`Pinata error: ${res.status} ${res.statusText} - ${errText}`)
        }
        const json = await res.json()
        if (!json.data?.cid) throw new Error("Pinata response missing CID")
        // Use the public gateway for access
        return `https://gateway.pinata.cloud/ipfs/${json.data.cid}`
      } catch (err: any) {
        if (retries === 0) throw err
        retries--
        await new Promise(r => setTimeout(r, 1000))
      }
    }
    throw new Error("Failed to upload metadata to Pinata after retries")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMinting(true);
    setError(null);
    try {
      // Only name and description are top-level, all others go to attributes
      // Sanitize and trim all string fields to prevent unsafe input
      const safeForm = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, typeof v === "string" ? v.trim() : v])
      );

      // Validate required fields (basic example, you can expand)
      if (!safeForm.name || !safeForm.description) {
        throw new Error("Name and description are required.");
      }

      const metadata = {
        name: safeForm.name,
        description: safeForm.description,
        attributes: [
          { trait_type: "PublisherEmail", value: safeForm.PublisherEmail },
          { trait_type: "Discount", value: safeForm.discount },
          { trait_type: "ExpiryDate", value: safeForm.expiryDate },
          { trait_type: "Type", value: safeForm.type },
          { trait_type: "Image", value: safeForm.image },
          { trait_type: "Location", value: safeForm.location },
          { trait_type: "Terms", value: safeForm.terms },
          { trait_type: "UsageLimit", value: safeForm.usageLimit },
          { trait_type: "ValidDays", value: safeForm.validDays },
          { trait_type: "Category", value: safeForm.category },
          { trait_type: "Contact", value: safeForm.contact },
          { trait_type: "Highlight", value: safeForm.highlight },
          { trait_type: "Merchant", value: safeForm.merchant },
          { trait_type: "Price", value: safeForm.price },
        ].filter(attr => attr.value !== ""), // Remove empty attributes
      };
      const uri = await uploadMetadataToPinata(metadata);
      setMetadataUri(uri);
    } catch (err: any) {
      setError(err.message);
    }
    setMinting(false);
  }

  // Get current user email from localStorage
  let currentEmail = "unknown";
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        currentEmail = userObj.email || "unknown";
      } catch {
        currentEmail = "unknown";
      }
    }
  }

  // Helper to get next id
  function getNextVoucherId() {
    if (!marketplaceVouchers.length) return 1;
    return Math.max(...marketplaceVouchers.map(v => v.id)) + 1;
  }

  // Helper to get owner info from account/email
  function getOwnerInfo(email: string) {
    const user = mockUsers.find(u => u.email === email);
    if (!user) return { username: email, displayName: email, email };
    return { username: user.email, displayName: user.displayName, email: user.email };
  }

  // Call this after successful form submission to create the voucher object
  function createVoucherFromForm(form: any, accountEmail: string) {
    return {
      id: getNextVoucherId(),
      name: form.name,
      PublisherEmail: form.PublisherEmail,
      description: form.description,
      discount: form.discount,
      expiryDate: form.expiryDate,
      price: form.price,
      type: form.type,
      status: "available",
      image: form.image,
      location: form.location,
      terms: form.terms,
      usageLimit: form.usageLimit,
      validDays: form.validDays,
      category: form.category,
      contact: form.contact,
      highlight: form.highlight,
      merchant: form.merchant,
      owner: getOwnerInfo(accountEmail)
    };
  }

  // Create voucher variable from form and current user
  const voucher = createVoucherFromForm(form, currentEmail);

  // Show MintNFT form with metadataUri after upload
  if (metadataUri) {
    return (
      <MintNFT
        className="mt-6"
        collectionMint={undefined}
        URI={metadataUri}
        lockUri={true}
        onReset={() => setMetadataUri(null)}
        voucher={voucher} // Pass voucher to MintNFT
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-2xl mx-auto rounded-2xl shadow-2xl p-10 border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-blue-100"
    >
      <h2 className="text-3xl font-extrabold text-center mb-8 text-indigo-700 tracking-tight drop-shadow">
        <span className="inline-block align-middle mr-2">🎟️</span>
        Create Voucher Metadata
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Voucher Name</label>
          <Input
            name="name"
            placeholder="Voucher Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Publisher Email</label>
          <Input
            name="PublisherEmail"
            placeholder="Publisher Email"
            value={form.PublisherEmail}
            onChange={handleChange}
            required
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Discount</label>
          <Input
            name="discount"
            placeholder="Discount (e.g. 10%)"
            value={form.discount}
            onChange={handleChange}
            required
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Price</label>
          <Input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            min={0}
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Expiry Date</label>
          <Input
            name="expiryDate"
            placeholder="Expiry Date (YYYY-MM-DD)"
            value={form.expiryDate}
            onChange={handleChange}
            required
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
            type="date"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="w-full rounded border border-indigo-200 px-3 py-2 bg-white/80 focus:border-indigo-400 focus:ring-indigo-300"
          >
            <option value="">Select type</option>
            <option value="discount">Discount</option>
            <option value="gift">Gift</option>
            <option value="special">Special</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Merchant</label>
          <Input
            name="merchant"
            placeholder="Merchant"
            value={form.merchant}
            onChange={handleChange}
            required
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Image (PNG or JPG)</label>
          <Input
            type="file"
            name="image"
            accept=".png,.jpg,.jpeg,image/png,image/jpeg"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              // Only allow png or jpg/jpeg
              if (!["image/png", "image/jpeg"].includes(file.type)) {
                setError("Only PNG or JPG images are allowed.");
                return;
              }
              // Save file to public/images/vouchers (dev only; in production, use a backend or storage service)
              const fileName = `${Date.now()}_${file.name}`;
              try {
                // This requires a backend API to handle file uploads!
                const formData = new FormData();
                formData.append("file", file);
                formData.append("fileName", fileName);
                const res = await fetch("/api/upload-voucher-image", {
                  method: "POST",
                  body: formData,
                });
                if (!res.ok) throw new Error("Failed to upload image.");
                setForm(f => ({
                  ...f,
                  image: `/images/vouchers/${fileName}`,
                }));
                setError(null);
              } catch (err: any) {
                setError("Image upload failed: " + err.message);
              }
            }}
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
          {form.image && (
            <img
              src={form.image}
              alt="Voucher Preview"
              className="mt-3 max-h-40 rounded-lg shadow-lg border border-indigo-100 object-contain mx-auto"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Location</label>
          <Input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Terms</label>
          <Input
            name="terms"
            placeholder="Terms (optional)"
            value={form.terms}
            onChange={handleChange}
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Usage Limit</label>
          <Input
            name="usageLimit"
            placeholder="Usage Limit (default: unlimited)"
            value={form.usageLimit}
            onChange={handleChange}
            required
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Valid Days</label>
          <Input
            name="validDays"
            placeholder="Valid Days (default: All week)"
            value={form.validDays}
            onChange={handleChange}
            required
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Category</label>
          <Input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Contact</label>
          <Input
            name="contact"
            placeholder="Contact"
            value={form.contact}
            onChange={handleChange}
            required
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Highlight</label>
          <Input
            name="highlight"
            placeholder="Highlight (optional)"
            value={form.highlight}
            onChange={handleChange}
            className="w-full bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-indigo-700 mb-1">Description</label>
          <Textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full min-h-[80px] bg-white/80 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={minting}
        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-xl shadow-lg transition-all duration-200"
      >
        {minting ? (
          <span className="flex items-center justify-center">
            <svg className="inline mr-2 w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Uploading Metadata...
          </span>
        ) : (
          <>
            <span className="inline-block align-middle mr-2">🚀</span>
            Next: Mint NFT
          </>
        )}
      </Button>
      {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
    </form>
  )
}