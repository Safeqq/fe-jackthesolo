import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getGames,
  getGameDetail,
  searchGames,
  getCategories,
  login,
  register,
} from "./api";
import type {
  GamesListResponse,
  GameDetail,
  SearchResponse,
  CategoriesResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types";

/* ── Queries ── */

export function useGames(params: {
  page?: number;
  per_page?: number;
  translate?: boolean;
  category?: string;
  q?: string;
  sort?: string;
  order?: "asc" | "desc";
} = {}) {
  return useQuery<GamesListResponse>({
    queryKey: ["games", params],
    queryFn: () => getGames(params),
    staleTime: 60_000,
  });
}

export function useGameDetail(url: string, translate = false) {
  return useQuery<GameDetail>({
    queryKey: ["game", url, translate],
    queryFn: () => getGameDetail(url, translate),
    enabled: !!url,
    staleTime: 10 * 60_000,
  });
}

export function useSearch(q: string, translate = false) {
  return useQuery<SearchResponse>({
    queryKey: ["search", q, translate],
    queryFn: () => searchGames(q, translate),
    enabled: q.length > 0,
    staleTime: 0,
  });
}

export function useCategories(translate = false) {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories", translate],
    queryFn: () => getCategories(translate),
    staleTime: 60 * 60_000,
  });
}

/* ── Mutations ── */

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: register,
  });
}
