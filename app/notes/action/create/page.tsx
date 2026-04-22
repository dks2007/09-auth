import type { Metadata } from "next";
import CreateNoteClient from "./CreateNote.client";

export const metadata: Metadata = {
  title: "Create note | NoteHub",
  description: "Create a new note in NoteHub and save your ideas quickly.",
  alternates: {
    canonical: "/notes/action/create",
  },
  openGraph: {
    title: "Create note | NoteHub",
    description: "Create a new note in NoteHub and save your ideas quickly.",
    url: "/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note in NoteHub",
      },
    ],
  },
};

export default function CreateNotePage() {
  return <CreateNoteClient />;
}
