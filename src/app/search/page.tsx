import { searchGames } from "@/lib/api";
import { GameCard } from "@/components/game/GameCard";
import { Search, Frown } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";

  let results: any[] = [];
  let error = null;

  if (q.length >= 2) {
    try {
      const data = await searchGames(q);
      results = data.results;
    } catch (e: any) {
      error = e.message;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex-1 w-full relative">
      <div className="mb-12 border-b border-border/40 pb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Search Results</h1>
        <div className="flex items-center gap-3 text-xl text-muted-foreground font-mono">
          <Search className="w-6 h-6 text-primary" />
          <span>Results for <span className="text-foreground font-bold underline decoration-primary/50 underline-offset-4">"{q}"</span></span>
        </div>
      </div>

      {q.length < 2 ? (
        <div className="py-24 text-center text-muted-foreground font-mono bg-muted/20 rounded-2xl border border-border/50">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Please enter at least 2 characters to search.</p>
        </div>
      ) : error ? (
        <div className="py-24 text-center text-destructive font-mono bg-destructive/5 rounded-2xl border border-destructive/20">
          <Frown className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <p className="text-lg">Error searching games: {error}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center bg-muted/20 rounded-2xl border border-border/50">
          <div className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center border border-border/50">
            <Search className="w-10 h-10 text-muted-foreground opacity-50" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No games found</h2>
          <p className="text-muted-foreground font-mono">Try adjusting your search query or browsing categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
