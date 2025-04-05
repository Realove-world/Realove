"use client";

import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input, Select, Typography, Button } from "@worldcoin/mini-apps-ui-kit-react";
import ProfileCard from "@/components/ProfileCard";

export default function Page() {
  const router = useRouter();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      router.push("/matching/matching-albert");
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  return (
    <div {...swipeHandlers} className="flex flex-col h-[100dvh] bg-white safe-area-inset touch-pan-x">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <Typography level={1} className="text-5xl" variant="heading">
          Realove 💖
        </Typography>

        <main className="bg-cream flex items-center justify-center">
          <ProfileCard imageUrl={"/Albert.png"} />
        </main>
      </div>
    </div>
  );
}
