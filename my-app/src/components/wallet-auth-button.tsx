"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useRouter } from "next/navigation";

interface WalletAuthButtonProps {
  onSuccess?: () => void;
}

export function WalletAuthButton({ onSuccess }: WalletAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleWalletAuth = async () => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/nonce");
      const { nonce } = await res.json();
      console.log("nonce", nonce);
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce,
        expirationTime: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
        statement: "Sign in with your World ID wallet",
      });

      if (finalPayload.status === "error") {
        throw new Error(finalPayload.error_code);
      }

      const verifyRes = await fetch("/api/complete-siwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload,
          nonce,
        }),
      });
      console.log("verifyRes", verifyRes);
      const verification = await verifyRes.json();
      console.log("verification", verification);

      if (verification.isValid) {
        await signIn("worldcoin-wallet", {
          message: finalPayload.message,
          signature: finalPayload.signature,
          address: finalPayload.address,
          nonce,
          redirect: false,
        });

        // Call onSuccess if provided
        if (onSuccess) onSuccess();
        router.push("/user-info");
      }
    } catch (error) {
      console.error("Wallet auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleWalletAuth}
      disabled={isLoading}
      className="px-6 py-3 bg-white text-black font-mono text-lg rounded-xl border-2 border-black shadow-[5px_5px_0px_0px_black] transition-all disabled:opacity-50 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[7px_7px_0px_0px_black]"
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span className="font-serif">Connecting...</span>
        </div>
      ) : (
        <div className="flex items-center">
          <span className="mr-2">💖</span>
          <span className="font-serif">Connect Wallet</span>
          <span className="ml-2">💖</span>
        </div>
      )}
    </button>
  );
}
