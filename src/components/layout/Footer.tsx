export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-0 mt-auto bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          Built for <span className="text-foreground font-mono font-semibold">JackTheSolo</span>. Data scraped from online-fix.me.
        </p>
        <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full border border-border/50">
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">API Status: Online</span>
        </div>
      </div>
    </footer>
  );
}
