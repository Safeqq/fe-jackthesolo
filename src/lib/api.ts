import { api } from "./axios";
import type {
  CategoriesResponse,
  GameDetail,
  GamesListResponse,
  LoginResponse,
  RegisterResponse,
  SearchResponse,
} from "./types";

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
  const { data } = await api.get<{
    success: boolean;
    messages: string;
    data: GamesListResponse;
  }>("/api/v1/ofm/games", { params: query });
  if (!data.success) throw new Error(data.messages);
  return data.data;
}

export async function getGameDetail(url: string, translate = false) {
  const { data } = await api.get<{
    success: boolean;
    messages: string;
    data: GameDetail;
  }>("/api/v1/ofm/game", { params: { url, translate: String(translate) } });
  if (!data.success) throw new Error(data.messages);
  return data.data;
}

export async function searchGames(q: string, translate = false) {
  const { data } = await api.get<{
    success: boolean;
    messages: string;
    data: SearchResponse;
  }>("/api/v1/ofm/search", { params: { q, translate: String(translate) } });
  if (!data.success) throw new Error(data.messages);
  return data.data;
}

export async function getCategories(translate = false) {
  const { data } = await api.get<{
    success: boolean;
    messages: string;
    data: CategoriesResponse;
  }>("/api/v1/ofm/categories", {
    params: { translate: String(translate) },
  });
  if (!data.success) throw new Error(data.messages);
  return data.data;
}

export function extractCategorySlug(url: string) {
  const match = url.match(/\/games\/([^\/]+)\/?$/);
  return match ? match[1] : null;
}

/* ── Auth ── */
export async function login(body: { username: string; password: string }) {
  const { data } = await api.post<{
    success: boolean;
    messages: string;
    data: LoginResponse;
  }>("/api/v1/ofm/login", body);
  if (!data.success) throw new Error(data.messages);
  return data.data;
}

export async function register(body: {
  email: string;
  name: string;
  password: string;
}) {
  const { data } = await api.post<{
    success: boolean;
    messages: string;
    data: RegisterResponse;
  }>("/api/v1/ofm/register", body);
  if (!data.success) throw new Error(data.messages);
  return data.data;
}
