import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QueryProvider } from "@/components/QueryProvider";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JackTheSolo | Multiplayer Game Scraper",
  description: "Browse and discover games with online/LAN support from online-fix.me.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground relative overflow-x-hidden">
        {/* Animated Background Gradient */}
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20 dark:opacity-30 mix-blend-screen">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/30 blur-[120px] animate-pulse" style={{ animationDuration: "8s" }} />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sidebar-primary/20 blur-[120px] animate-pulse" style={{ animationDuration: "12s" }} />
        </div>
        
        <TooltipProvider>
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
            </div>
          </QueryProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
