import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
}

export function Pagination({ page, totalPages, basePath, searchParams }: PaginationProps) {
  const getUrl = (p: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(searchParams)) {
      if (v && k !== "page") sp.set(k, String(v));
    }
    sp.set("page", p.toString());
    return `${basePath}?${sp.toString()}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8 font-mono">
        {page > 1 ? (
          <Link href={getUrl(page - 1)} className={cn(buttonVariants({ variant: "outline", size: "icon" }))}>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        ) : (
          <div className={cn(buttonVariants({ variant: "outline", size: "icon" }), "opacity-50 pointer-events-none")}><ChevronLeft className="w-4 h-4" /></div>
        )}
      
      <div className="flex items-center justify-center px-4 h-9 rounded-md border border-border/40 bg-card text-sm">
        Page <span className="text-primary font-bold mx-1">{page}</span> of {totalPages}
      </div>

        {page < totalPages ? (
          <Link href={getUrl(page + 1)} className={cn(buttonVariants({ variant: "outline", size: "icon" }))}>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className={cn(buttonVariants({ variant: "outline", size: "icon" }), "opacity-50 pointer-events-none")}><ChevronRight className="w-4 h-4" /></div>
        )}
    </div>
  );
}
