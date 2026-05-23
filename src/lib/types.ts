export interface GameSummary {
  title: string;
  id: string;
  url: string;
  poster: string | null;
  date: string | null;
  views: number | null;
  comments: number | null;
}

export interface DownloadLink {
  text: string;
  url: string;
}

export interface GameDetail {
  title: string;
  id: string;
  url: string;
  poster: string | null;
  description: string | null;
  content: string | null;
  download_links: DownloadLink[];
}

export interface Pagination {
  page: number;
  per_page: number;
  total_pages: number;
  total_items: number | null;
  has_next: boolean;
  has_previous: boolean;
  next_url: string | null;
  previous_url: string | null;
}

export interface GamesListResponse {
  pagination: Pagination;
  games: GameSummary[];
}

export interface SearchResponse {
  query: string;
  results: GameSummary[];
}

export interface CategoryItem {
  name: string;
  url: string;
}

export interface CategoriesResponse {
  categories: CategoryItem[];
}

export interface ApiResponse<T> {
  success: boolean;
  status: string;
  messages: string;
  data: T;
}
