import Link from "next/link";
import { Gamepad2, Hash } from "lucide-react";
import { getCategories, extractCategorySlug } from "@/lib/api";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function Categories() {
  const data = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex-1 w-full relative">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-16 text-center max-w-2xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
          Browse by Category
        </h1>
        <p className="text-muted-foreground font-mono text-lg leading-relaxed">
          Explore our vast collection of multiplayer games organized by genre. Find exactly what you're looking to play.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 relative z-10">
        {data.categories.map(cat => {
          const slug = extractCategorySlug(cat.url);
          return (
            <Link 
              key={cat.url}
              href={`/games?category=${slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] hover:-translate-y-1.5 flex flex-col items-center justify-center gap-4 text-center"
            >
              <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <Hash className="w-24 h-24" />
              </div>
              <div className="p-4 rounded-full bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300 relative z-10 border border-border/50 group-hover:border-primary/20">
                <Gamepad2 className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              <span className="font-bold text-lg group-hover:text-primary transition-colors duration-300 relative z-10">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
