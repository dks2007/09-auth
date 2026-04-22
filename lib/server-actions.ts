"use server";

import type { Note, CreateNoteRequest } from "../types/note";
import {
  fetchNotes as apiGetNotes,
  fetchNoteById as apiGetNoteById,
  createNote as apiCreateNote,
  deleteNote as apiDeleteNote,
  type FetchNotesResponse,
  type DeleteNoteResponse,
} from "./api";

export async function fetchNotes(
  page: number = 1,
  perPage: number = 12,
  search: string = "",
  tag?: string,
): Promise<FetchNotesResponse> {
  return apiGetNotes(page, perPage, search, tag);
}

export async function fetchNoteById(id: string): Promise<Note> {
  return apiGetNoteById(id);
}

export async function createNote(noteData: CreateNoteRequest): Promise<Note> {
  return apiCreateNote(noteData);
}

export async function deleteNote(id: string): Promise<DeleteNoteResponse> {
  return apiDeleteNote(id);
}
