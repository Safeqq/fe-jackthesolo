import { getGames, getCategories, extractCategorySlug } from "@/lib/api";
import { GameCard } from "@/components/game/GameCard";
import { Pagination } from "@/components/browse/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Search } from "lucide-react";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function BrowseGames({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  
  const page = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page) : 1;
  const category = typeof resolvedParams.category === "string" ? resolvedParams.category : undefined;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : undefined;
  const sort = typeof resolvedParams.sort === "string" ? resolvedParams.sort : undefined;
  const order = typeof resolvedParams.order === "string" ? (resolvedParams.order as "asc" | "desc") : "desc";

  const [gamesData, categoriesData] = await Promise.all([
    getGames({ page, category, q, sort, order }),
    getCategories()
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Browse Games</h1>
        <p className="text-muted-foreground font-mono">
          {category ? `Category: ${category}` : "All Games"} {q && `- Search: "${q}"`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b border-border/40 pb-2">Categories</h3>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              <Link 
                href="/games"
                className={`text-sm px-3 py-1.5 rounded-md transition-colors ${!category ? 'bg-primary/20 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'}`}
              >
                All Games
              </Link>
              {categoriesData.categories.map(cat => {
                const slug = extractCategorySlug(cat.url);
                const isActive = category === slug;
                return (
                  <Link 
                    key={cat.url}
                    href={`/games?category=${slug}`}
                    className={`text-sm px-3 py-1.5 rounded-md transition-colors ${isActive ? 'bg-primary/20 text-primary font-medium' : 'text-muted-foreground hover:bg-muted'}`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/30 p-4 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
              Showing page <span className="text-foreground font-bold">{gamesData.pagination.page}</span> of {gamesData.pagination.total_pages}
            </div>
            
            {/* Sort & Search Params would be here via client components in a real app, 
                for now we just display the current active filters if any */}
            <div className="flex items-center gap-2">
               {q && (
                 <Badge variant="secondary" className="font-mono flex items-center gap-1">
                   <Search className="w-3 h-3" /> "{q}"
                 </Badge>
               )}
            </div>
          </div>

          {gamesData.games.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground opacity-50" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No games found</h2>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamesData.games.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}

          {gamesData.pagination.total_pages > 1 && (
            <Pagination 
              page={gamesData.pagination.page}
              totalPages={gamesData.pagination.total_pages}
              basePath="/games"
              searchParams={{ category, q, sort, order }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
