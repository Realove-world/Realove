"use client";

import { useState } from "react";
import { Input, Select, Typography, Button } from "@worldcoin/mini-apps-ui-kit-react";
import { MiniKit, tokenToDecimals, Tokens, PayCommandInput } from '@worldcoin/minikit-js';
//import "@worldcoin/mini-apps-ui-kit-react/styles.css";

export default function Page() {
  const handlePayment = async (amount: number) => {
    try {
      // Generate a unique reference ID
      const reference = crypto.randomUUID().replace(/-/g, '');
      
      const payload: PayCommandInput = {
        reference,
        to: '0xcdc892cb2a5da199c5b6e2e7b99ab33226256607',
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(amount, Tokens.WLD).toString(),
          }
        ],
        description: `Dating pack payment - ${amount} WLD`,
      };

      if (!MiniKit.isInstalled()) {
        console.error("MiniKit is not installed");
        return;
      }

      const { finalPayload } = await MiniKit.commandsAsync.pay(payload);

      if (finalPayload.status === 'success') {
        console.log("Payment successful:", finalPayload);
        // Here you can add additional success handling
      } else {
        console.error("Payment failed:", finalPayload);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-white safe-area-inset">
        {/* Background Image */}
    <img
      src="/dating-pack.png"
      alt="Background"
      className="absolute top-0 left-0 w-full h-full object-cover opacity-15 pointer-events-none"
    />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
        <Typography level={1} 
        className="text-6xl"
        variant="heading">
          Realove �
        </Typography>

        <Typography level={1} 
        className="font-bold"
        variant="subtitle">
          Let's create eternal memory with your date!
        </Typography>

        <button 
          onClick={() => handlePayment(0.05)}
          className="w-[80%] relative px-4 py-2 bg-white border-2 border-black rounded-md text-black font-mono text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100">
          Taipei $50 pack
        </button>

        <button 
          onClick={() => handlePayment(0.1)}
          className="w-[80%] relative px-4 py-2 bg-white border-2 border-black rounded-md text-black font-mono text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100">
          Taipei $100 pack
        </button>

        <button 
          onClick={() => handlePayment(0.3)}
          className="w-[80%] relative px-4 py-2 bg-white border-2 border-black rounded-md text-black font-mono text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100">
          Taipei $300 pack
        </button>

        <button 
          onClick={() => window.location.href = '/matching'}
          className="w-[80%] relative px-4 py-2 bg-white border-2 border-black rounded-md text-black font-mono text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100">
          Skip For Now...
        </button>

       
    </div>
    </div>   

  );
}
