import Link from "next/link";
import Image from "next/image";
import { Eye, MessageSquare, Calendar } from "lucide-react";
import { GameSummary } from "@/lib/types";

interface GameCardProps {
  game: GameSummary;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link 
      href={`/${game.id}`} 
      className="group flex flex-col rounded-xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        {game.poster ? (
          <Image
            src={game.poster}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/50">
            <span className="text-muted-foreground font-mono text-sm">No Poster</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
        
        {/* Hover Stats Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
            {game.views !== null && (
              <div className="flex items-center gap-1.5 bg-background/90 px-2 py-1 rounded-md backdrop-blur-md border border-border/50">
                <Eye className="w-3.5 h-3.5 text-primary" />
                <span>{game.views}</span>
              </div>
            )}
            {game.comments !== null && (
              <div className="flex items-center gap-1.5 bg-background/90 px-2 py-1 rounded-md backdrop-blur-md border border-border/50">
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                <span>{game.comments}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 p-4 relative z-10 bg-gradient-to-t from-background/80 to-transparent">
        <h3 className="font-semibold text-base leading-tight line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-200">
          {game.title}
        </h3>
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/30 font-mono">
          {game.date && (
            <div className="flex items-center gap-1.5 opacity-80">
              <Calendar className="w-3.5 h-3.5" />
              <span>{game.date}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
