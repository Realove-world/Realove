"use client";

import { useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useSession } from "next-auth/react";
import { TUTE_ABI, TUTE_CONTRACT_ADDRESS } from "@/tute-abi";

interface ClaimButtonProps {
  onSuccess: (txId: string) => void;
}

export function ClaimButton({ onSuccess }: ClaimButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  async function handleMint() {
    if (!MiniKit.isInstalled()) {
      console.error("MiniKit is not installed");
      return;
    }

    if (!session?.user?.address) {
      console.error("User not authenticated");
      return;
    }

    try {
      setIsLoading(true);
      // Send transaction to mint tokens
      const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: TUTE_CONTRACT_ADDRESS,
            abi: TUTE_ABI,
            functionName: "claim",
            args: [],
          },
        ],
      });

      if (finalPayload.status === "error") {
        console.error("Error minting tokens:", finalPayload);
        return;
      }

      console.log("Minting successful:", finalPayload);
      onSuccess(finalPayload.transaction_id);
    } catch (error) {
      console.error("Error minting tokens:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleMint}
      disabled={isLoading}
      className="w-full max-w-xs px-8 py-4 bg-purple-500 text-white font-medium text-lg rounded-xl shadow-sm hover:bg-purple-600 active:bg-purple-700 transition-colors touch-manipulation disabled:bg-purple-300 disabled:cursor-not-allowed"
    >
      {isLoading ? "Minting..." : "Claim Your TUTE"}
    </button>
  );
}
