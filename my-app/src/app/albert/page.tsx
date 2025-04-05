"use client";

import { useState } from "react";
import { Input, Select, Typography, Button } from "@worldcoin/mini-apps-ui-kit-react";
//import "@worldcoin/mini-apps-ui-kit-react/styles.css";
import ProfileCard from "@/components/ProfileCard";

export default function Page() {
  

  return (
    <div className="flex flex-col h-[100dvh] bg-white safe-area-inset">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8">
        <Typography level={1} 
        className="text-6xl"
        variant="heading">
          Realove 💖
        </Typography>

        <main className="min-h-screen bg-cream flex items-center justify-center">
      <ProfileCard imageUrl={"/Anny.JPG"} />
    </main>

       
    </div>
    </div>   

  );
}
