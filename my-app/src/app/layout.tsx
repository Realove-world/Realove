import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "@/providers/session-provider";
import MiniKitProvider from "@/providers/minikit-provider";
import { ErudaProvider } from "@/providers/eruda-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TUTE App",
  description: "Claim your TUTE tokens",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErudaProvider>
          <SessionProvider>
            <MiniKitProvider>{children}</MiniKitProvider>
          </SessionProvider>
        </ErudaProvider>
      </body>
    </html>
  );
}
