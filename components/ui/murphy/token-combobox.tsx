"use client";
import React, { useEffect, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SolAsset } from "@/types/assets";
import { PublicKey } from "@solana/web3.js";
import { TokenIcon } from "./token-icon";
import { fetchWalletAssets } from "@/lib/assets/birdeye/wallets";
import { useWallet } from "@solana/wallet-adapter-react";

type TokenComboboxProps = {
  assets?: SolAsset[];
  trigger?: React.ReactNode;
  address?: PublicKey | null;
  showBalances?: boolean;
  onSelect?: (token: SolAsset) => void;
  onSearch?: ({
    query,
    owner,
  }: {
    query: string;
    owner?: PublicKey;
  }) => Promise<SolAsset[]>;
};

export function TokenCombobox({
  assets: initialAssets,
  trigger,
  address,
  showBalances = true,
  onSelect,
  onSearch,
}: TokenComboboxProps) {
  const { publicKey } = useWallet();
  const [open, setOpen] = React.useState(false);
  const [assets, setAssets] = React.useState<SolAsset[]>(initialAssets || []);
  const [value, setValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoading, setLoading] = useState(false);
  const selectedAsset = React.useMemo(
    () => assets.find((asset) => asset.mint.toBase58().toLowerCase() === value),
    [assets, value],
  );

  const fetchData = async () => {
    if (!publicKey) return;
    try {
      setLoading(true);

      const fetchedAssets = await fetchWalletAssets({
        owner: publicKey,
      });
      setAssets(fetchedAssets);
    } finally {
      setLoading(false);
    }
  }
  // In case assets array not provided -> fetch from user wallet
  useEffect(() => {
    if (assets.length == 0) {
      fetchData()
    }
  }, []);
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            role="combobox"
            size="lg"
            aria-expanded={open}
            className="h-12 w-[300px] justify-start gap-2.5 px-3 font-medium"
          >
            {selectedAsset ? (
              <>
                <TokenIcon asset={selectedAsset} />
                {selectedAsset.symbol}
              </>
            ) : (
              "Select token..."
            )}
            <ChevronsUpDownIcon size={16} className="ml-auto opacity-50" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search tokens..."
            onValueChange={setSearchValue}
          />
          <CommandList>
            {assets.length === 0 && (
              <CommandEmpty>
                {searchValue ? "No tokens found." : "Loading..."}
              </CommandEmpty>
            )}
            <CommandGroup>
              {assets.map((asset) => (
                <CommandItem
                  key={asset.mint.toBase58()}
                  value={asset.mint.toBase58().toLowerCase()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    if (onSelect) onSelect(asset);
                  }}
                  className="flex items-center gap-2"
                >
                  <TokenIcon asset={asset} />
                  {asset.symbol}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
