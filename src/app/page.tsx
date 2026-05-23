import Link from "next/link";
import { ArrowRight, Sparkles, Gamepad2 } from "lucide-react";
import { getGames, getCategories, extractCategorySlug } from "@/lib/api";
import { GameCard } from "@/components/game/GameCard";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const revalidate = 60;
export const dynamic = "force-dynamic";

export default async function Home() {
  const [gamesData, categoriesData] = await Promise.all([
    getGames({ page: 1, per_page: 8 }),
    getCategories()
  ]);

  const featuredGames = gamesData.games.slice(0, 8);
  const categories = categoriesData.categories;

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10 pointer-events-none" />
        
        <div className="container px-4 mx-auto relative z-20 text-center flex flex-col items-center">
          <Badge variant="outline" className="mb-6 font-mono border-primary/50 text-primary bg-primary/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            <Sparkles className="w-4 h-4 mr-2 inline animate-pulse" />
            Ultimate Multiplayer Experience
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground to-foreground/40 drop-shadow-sm">
            Discover & Play<br />Together.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-mono leading-relaxed">
            Your premium destination for games with online and LAN multiplayer support. Sourced from the best, built for gamers.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/games" className={cn(buttonVariants({ size: "lg" }), "rounded-full font-mono font-bold hover:shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all h-12 px-8")}>
                Browse Library <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/categories" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full font-mono backdrop-blur-md bg-background/50 border-border/50 hover:bg-muted/50 h-12 px-8")}>
                View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Featured Titles</h2>
              <p className="text-muted-foreground font-mono text-sm md:text-base">Top picks of the week</p>
            </div>
            <Link href="/games" className={cn(buttonVariants({ variant: "ghost" }), "font-mono hover:text-primary hover:bg-primary/10 rounded-full")}>
                View all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 bg-muted/20 border-t border-border/40 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.05),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Popular Categories</h2>
              <p className="text-muted-foreground font-mono text-sm md:text-base">Find your genre</p>
            </div>
            <Link href="/categories" className={cn(buttonVariants({ variant: "ghost" }), "font-mono hover:text-primary hover:bg-primary/10 rounded-full")}>
                All categories <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map(cat => {
              const slug = extractCategorySlug(cat.url);
              return (
                <Link 
                  key={cat.url}
                  href={`/games?category=${slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] hover:-translate-y-1 flex flex-col items-center justify-center gap-4"
                >
                  <div className="p-4 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                    <Gamepad2 className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <span className="font-bold text-lg text-center group-hover:text-primary transition-colors duration-300">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
