"use client"
import { CreateMerkleTree } from "@/components/ui/murphy/create-merkleTree-form";
import { WalletProvider } from "@/components/providers/wallet-provider"
export default function MyPage() {
   const handleMerkleTreeCreated = (merkleTreeAddress: string) => {
    console.log(`New Merkle Tree created: ${merkleTreeAddress}`);
    // Do something with the new Merkle Tree address
  };
 
    return (
    <div>
      <h1 className="text-xl font-bold mb-2">Create Merkle Tree on Solana</h1>
        <WalletProvider>
            <CreateMerkleTree 
            onMerkleTreeCreated={handleMerkleTreeCreated}
            />
        </WalletProvider>
    </div>
  );
}