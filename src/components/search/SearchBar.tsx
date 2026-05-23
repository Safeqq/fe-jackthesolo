"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
      <Input 
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 bg-muted/50 border-transparent focus-visible:border-primary transition-all duration-300 rounded-full font-mono text-sm h-10 shadow-sm" 
        placeholder="Search games..." 
      />
    </form>
  );
}
