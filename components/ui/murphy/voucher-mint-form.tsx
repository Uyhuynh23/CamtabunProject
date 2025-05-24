'use client'
import { useState } from "react"
import { MintNFT } from "./mint-nft-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useWallet } from "@solana/wallet-adapter-react"


export function VoucherMintForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "",
    discount: "",
    minSpend: "",
    expiry: "",
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
      const metadata = {
        name: form.name,
        description: form.description,
        attributes: [
          { trait_type: "Brand", value: form.brand },
          { trait_type: "Discount", value: form.discount },
          { trait_type: "Min Spend", value: form.minSpend },
          { trait_type: "Expiry", value: form.expiry },
        ],
      };
      const uri = await uploadMetadataToPinata(metadata);
      setMetadataUri(uri);
    } catch (err: any) {
      setError(err.message);
    }
    setMinting(false);
  }

  // Show MintNFT form with metadataUri after upload
  if (metadataUri) {
    return (
      <MintNFT
        className="mt-6"
        collectionMint={undefined}
        URI={metadataUri}
        lockUri={true}
        onReset={() => setMetadataUri(null)} // <-- Add this
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto rounded-xl shadow-lg p-8 border border-gray-100"
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)"
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Voucher Metadata</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Voucher Name</label>
          <Input
            name="name"
            placeholder="Voucher Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <Input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
          <Input
            name="discount"
            placeholder="Discount (e.g. 10%)"
            value={form.discount}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Spend</label>
          <Input
            name="minSpend"
            placeholder="Min Spend (e.g. $20)"
            value={form.minSpend}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
          <Input
            name="expiry"
            placeholder="Expiry (YYYY-MM-DD)"
            value={form.expiry}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <Textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full min-h-[80px]"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={minting}
        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg shadow"
      >
        {minting ? (
          <span>
            <svg className="inline mr-2 w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Uploading Metadata...
          </span>
        ) : (
          "Next: Mint NFT"
        )}
      </Button>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </form>
  )
}