import {
  ApiResponse,
  CategoriesResponse,
  GameDetail,
  GamesListResponse,
  SearchResponse,
} from "./types";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser should use relative path to hit the Next.js proxy
    return "";
  }
  // Server should hit the backend directly
  return process.env.BACKEND_URL || "https://jack-the-solo.vercel.app";
}

export async function fetchApi<T>(
  endpoint: string,
  params: Record<string, string> = {},
  revalidate: number = 60
): Promise<T> {
  const searchParams = new URLSearchParams(params);
  const url = `${getBaseUrl()}${endpoint}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  const json: ApiResponse<T> = await res.json();
  if (!json.success) {
    throw new Error(json.messages || "Unknown API error");
  }
  return json.data;
}

export async function getGames(
  params: {
    page?: number;
    per_page?: number;
    translate?: boolean;
    category?: string;
    q?: string;
    sort?: string;
    order?: "asc" | "desc";
  } = {}
) {
  const query: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) query[k] = String(v);
  }
  return fetchApi<GamesListResponse>("/api/v1/ofm/games", query, 60);
}

export async function getGameDetail(url: string, translate: boolean = false) {
  return fetchApi<GameDetail>(
    "/api/v1/ofm/game",
    { url, translate: String(translate) },
    600
  );
}

export async function searchGames(q: string, translate: boolean = false) {
  return fetchApi<SearchResponse>(
    "/api/v1/ofm/search",
    { q, translate: String(translate) },
    0 // don't cache search
  );
}

export async function getCategories(translate: boolean = false) {
  return fetchApi<CategoriesResponse>(
    "/api/v1/ofm/categories",
    { translate: String(translate) },
    3600
  );
}

export function extractCategorySlug(url: string) {
  // Extract slug from e.g., https://online-fix.me/games/survival/
  const match = url.match(/\/games\/([^\/]+)\/?$/);
  return match ? match[1] : null;
}
