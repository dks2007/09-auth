import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateNoteRequest } from "../../types/note";

export const initialDraft: CreateNoteRequest = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: CreateNoteRequest;
  setDraft: (note: Partial<CreateNoteRequest>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "notehub-draft-store",
    },
  ),
);
