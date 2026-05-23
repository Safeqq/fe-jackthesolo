import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, ShieldAlert } from "lucide-react";
import { getGameDetail } from "@/lib/api";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const revalidate = 600;
export const dynamic = "force-dynamic";

export default async function GameDetail({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  // Reconstruct the URL id from slug segments
  // The Next.js route is /games/[...slug], so the 'games' part is stripped from the slug.
  // We need to prepend 'games/' to match the backend expectation (e.g. games/survival/17320...)
  const slugPath = resolvedParams.slug.join("/");
  const urlPath = `games/${slugPath}`;
  
  const detail = await getGameDetail(urlPath);

  return (
    <div className="flex flex-col flex-1 bg-background">
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] min-h-[400px] max-h-[600px] bg-muted overflow-hidden border-b border-border/40">
        {detail.poster && (
          <div className="absolute inset-0">
            <Image
              src={detail.poster}
              alt={detail.title}
              fill
              className="object-cover blur-2xl scale-110 opacity-30 dark:opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
        
        <div className="max-w-7xl mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-12">
          <Link href="/games" className="inline-flex items-center text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-6 w-fit bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 hover:shadow-[0_0_15px_rgba(var(--primary),0.2)]">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Browse
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {detail.poster && (
              <div className="relative w-48 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden border-2 border-border/50 shadow-[0_0_40px_rgba(0,0,0,0.5)] shrink-0 group">
                <Image
                  src={detail.poster}
                  alt={detail.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
              </div>
            )}
            <div className="flex-1 pb-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-shadow-sm leading-tight">{detail.title}</h1>
              {detail.description && (
                <p className="text-base md:text-lg text-muted-foreground max-w-3xl line-clamp-3 font-mono leading-relaxed opacity-90">
                  {detail.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 w-full flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-12">
          <section className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl prose-img:border prose-img:border-border/50 font-sans leading-loose text-foreground/90">
            {detail.content ? (
              <div dangerouslySetInnerHTML={{ __html: detail.content }} />
            ) : (
              <div className="p-12 border border-border/50 border-dashed rounded-2xl text-center">
                <p className="text-muted-foreground font-mono">No detailed content available.</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-96 shrink-0 space-y-8">
          <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 lg:sticky lg:top-24 shadow-2xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 tracking-tight">
              <Download className="w-5 h-5 text-primary" />
              Downloads
            </h3>
            
            {detail.download_links.length > 0 ? (
              <div className="space-y-3">
                {detail.download_links.map((link, idx) => (
                    <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start h-auto py-3 px-4 font-mono text-left relative group overflow-hidden border-primary/20 hover:border-primary/50 bg-background/50")}>
                      <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10 flex flex-col gap-1 w-full">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{link.text}</span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                          External Link <ExternalLink className="w-3 h-3" />
                        </span>
                      </span>
                    </a>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-muted/30 rounded-xl border border-border/50 text-center">
                <p className="text-sm text-muted-foreground font-mono">No download links found.</p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-border/40">
              <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 w-full py-2.5 px-3 justify-center text-center font-mono font-medium rounded-lg">
                <ShieldAlert className="w-4 h-4 mr-2" /> Play responsibly
              </Badge>
              <p className="text-xs text-muted-foreground text-center mt-4 font-mono opacity-80 leading-relaxed">
                Downloads are provided by online-fix.me. JackTheSolo is a proxy and is not responsible for any downloaded contents.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
