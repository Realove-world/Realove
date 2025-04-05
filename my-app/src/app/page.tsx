"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { TuteTimer } from "@/components/TuteTimer";
import { VerifyButton } from "@/components/VerifyButton";
import { ClaimButton } from "@/components/ClaimButton";
import { WalletAuthButton } from "@/components/wallet-auth-button";
import { useWaitForTransactionReceipt } from "@worldcoin/minikit-react";
import { createPublicClient, http } from "viem";
import { worldchain } from "@/lib/chains";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { Typography } from "@worldcoin/mini-apps-ui-kit-react";
import { TransactionStatus } from "@/components/TransactionStatus";
import { useRouter } from "next/navigation";

// // This would come from environment variables in a real app
// const APP_ID =
//   process.env.NEXT_PUBLIC_WORLDCOIN_APP_ID ||
//   "app_9a73963d73efdf2e7d9472593dc9dffd";

export default function Page() {
  const { data: session, status } = useSession();
  const [walletConnected, setWalletConnected] = useState(false);
  const [verified, setVerified] = useState(false);
  const [tuteClaimed, setTuteClaimed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [claimCount, setClaimCount] = useState(0);
  const [transactionId, setTransactionId] = useState<string>("");
  const [isMinting, setIsMinting] = useState(false);
  const router = useRouter();

  // Initialize Viem client
  const client = createPublicClient({
    chain: worldchain,
    transport: http("https://worldchain-mainnet.g.alchemy.com/public"),
  });

  // Track transaction status
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      client,
      appConfig: {
        app_id: process.env.NEXT_PUBLIC_WLD_APP_ID || "",
      },
      transactionId,
    });

  // Check if user is authenticated when session changes
  useEffect(() => {
    if (status === "authenticated" && session?.user?.address) {
      console.log("User authenticated:", session.user);
      // Remove automatic handleWalletConnected call
    }
  }, [session, status]);

  // Update UI when transaction is confirmed
  useEffect(() => {
    if (isConfirmed && !tuteClaimed) {
      setTuteClaimed(true);
      setClaimCount((prevCount) => prevCount + 1);
      setIsMinting(false);
    }
  }, [isConfirmed, tuteClaimed]);

  // Handle wallet connection success
  const handleWalletConnected = async () => {
    console.log("handleWalletConnected called");
    setWalletConnected(true);
    
    // Wait for session to be updated
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get the username from the session
    const world_username = session?.user?.name;
    console.log("Current session:", session);
    console.log("World username:", world_username);
    
    // Ensure we have a username before redirecting
    if (world_username) {
      // Use window.location for navigation
      const url = `/user-info?username=${encodeURIComponent(world_username)}`;
      console.log("Redirecting to:", url);
      window.location.href = url;
    } else {
      console.error("No username found in session");
    }
  };

  // Handle verification success
  const handleVerificationSuccess = () => {
    console.log("Verification success callback triggered in TuteApp");
    setVerified(true);
  };

  // Handle claim success
  const handleClaimSuccess = (txId: string) => {
    console.log("Claim initiated with transaction ID:", txId);
    setTransactionId(txId);
    setIsMinting(true);
  };

  // Timer effect for claim cooldown
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (tuteClaimed && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // When timer reaches zero, enable claiming again
      setTuteClaimed(false);
      setVerified(false); // Reset verification for next claim cycle
      setTimeRemaining(300); // Reset timer for next claim
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [tuteClaimed, timeRemaining]);

  return (
    <div className="relative flex flex-col h-[100dvh] bg-white safe-area-inset overflow-hidden">
    {/* Background Image */}
    <img
      src="/image.png"
      alt="Background"
      className="absolute top-0 left-0 w-full h-full object-cover opacity-15 pointer-events-none"
    />

  
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
        <h1 className="text-5xl font-bold text-black">Realove</h1>
  
        <Typography level={2} variant="subtitle">
          The first dating app with only real human.
        </Typography>
  
        {tuteClaimed ? (
          <TuteTimer timeRemaining={timeRemaining} />
        ) : (
          <>
            {/* {!walletConnected ? ( */}
            {true ? (
              <WalletAuthButton onSuccess={handleWalletConnected} />
            ) : !verified ? (
              <VerifyButton onVerificationSuccess={handleVerificationSuccess} />
            ) : (
              <ClaimButton onSuccess={handleClaimSuccess} />
            )}
          </>
        )}
      </div>
    </div>
  );
  
}
