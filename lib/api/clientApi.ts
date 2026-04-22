import { api } from "./api";
import type { CreateNoteRequest, Note } from "@/types/note";
import type { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type DeleteNoteResponse = Note;

interface AuthCredentials {
  email: string;
  password: string;
}

interface SessionResponse {
  success: boolean;
}

interface UpdateMeRequest {
  username: string;
}

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = "",
  tag?: string,
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim() !== "") {
    params.search = search;
  }

  if (tag) {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (
  noteData: CreateNoteRequest,
): Promise<Note> => {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
  const response = await api.delete<DeleteNoteResponse>(`/notes/${id}`);
  return response.data;
};

export const register = async (credentials: AuthCredentials): Promise<User> => {
  const response = await api.post<User>("/auth/register", credentials);
  return response.data;
};

export const login = async (credentials: AuthCredentials): Promise<User> => {
  const response = await api.post<User>("/auth/login", credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<SessionResponse> => {
  const response = await api.get<SessionResponse>("/auth/session");
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>("/users/me");
  return response.data;
};

export const updateMe = async (body: UpdateMeRequest): Promise<User> => {
  const response = await api.patch<User>("/users/me", body);
  return response.data;
};
