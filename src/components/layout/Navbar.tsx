import Link from "next/link";
import { Gamepad2, LogIn, UserPlus } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <Gamepad2 className="w-8 h-8 text-primary animate-pulse" style={{ animationDuration: "3s" }} />
          <span className="font-mono font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
            JackTheSolo
          </span>
        </Link>
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
          <SearchBar />
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium font-mono">
          <Link href="/games" className="transition-colors hover:text-primary text-muted-foreground hover:shadow-[0_0_10px_rgba(var(--primary),0.5)] px-3 py-1 rounded-full">
            Browse
          </Link>
          <Link href="/categories" className="transition-colors hover:text-primary text-muted-foreground hover:shadow-[0_0_10px_rgba(var(--primary),0.5)] px-3 py-1 rounded-full">
            Categories
          </Link>
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/40">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "font-mono rounded-full gap-1.5"
              )}
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "sm" }),
                "font-mono rounded-full gap-1.5"
              )}
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
