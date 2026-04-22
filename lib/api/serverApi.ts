import { cookies } from "next/headers";
import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface SessionResponse {
  success: boolean;
}

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = "",
  tag?: string,
): Promise<FetchNotesResponse> => {
  const headers = await getCookieHeader();
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim() !== "") {
    params.search = search;
  }

  if (tag) {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>("/notes", {
    params,
    headers,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getCookieHeader();
  const response = await api.get<Note>(`/notes/${id}`, { headers });
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const headers = await getCookieHeader();
  const response = await api.get<User>("/users/me", { headers });
  return response.data;
};

export const checkSession = async (): Promise<SessionResponse> => {
  const headers = await getCookieHeader();
  const response = await api.get<SessionResponse>("/auth/session", { headers });
  return response.data;
};
