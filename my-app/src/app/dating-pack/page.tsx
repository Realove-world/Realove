"use client";

import { useState } from "react";
import { Input, Select, Typography, Button } from "@worldcoin/mini-apps-ui-kit-react";
//import "@worldcoin/mini-apps-ui-kit-react/styles.css";

export default function Page() {
  

  return (
    <div className="flex flex-col h-[100dvh] bg-white safe-area-inset">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
        <Typography level={1} 
        className="text-6xl"
        variant="heading">
          Realove 💖
        </Typography>

        <Typography level={1} 
        className="text-2xl"
        variant="subtitle">
          Select your event!
        </Typography>

        <button className="relative px-4 py-2 bg-white border-2 border-black rounded-md text-black font-mono text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100">
  ETH Global Prague
</button>

<button className="relative px-4 py-2 bg-white border-2 border-black rounded-md text-black font-mono text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100">
  ETH Global Cannes
</button>

<button className="relative px-4 py-2 bg-white border-2 border-black rounded-md text-black font-mono text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100">
  Olympics Los Angels
</button>

<button className="relative px-4 py-2 bg-white border-2 border-black rounded-md text-black font-mono text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-100">
  Skip For Now...
</button>

       
    </div>
    </div>   

  );
}
