import type { Metadata } from "next";
import { Space_Grotesk, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../../style/flows.css";
import { GameStateProvider } from "@/context/GameStateContext";
import { EscMenu } from "@/components/esc-menu/EscMenu";
import { EscKeyListener } from "@/components/esc-menu/KeyListener";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono"
});

export const metadata: Metadata = {
  title: "CADemy - Equation Arena Storyboard",
  description: "Interactive storyboard for the Equation Arena game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} font-sans`}>
        <GameStateProvider>
          {children}
          
          {/* ESC Menu components */}
          <EscMenu />
          <EscKeyListener />
        </GameStateProvider>
      </body>
    </html>
  );
}
