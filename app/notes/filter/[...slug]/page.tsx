import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/server-actions";
import NotesClient from "./Notes.client";

interface FilteredNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilteredNotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tagFromUrl = slug?.[0] ?? "all";
  const selectedTag =
    tagFromUrl === "all" ? "All" : decodeURIComponent(tagFromUrl);

  return {
    title: `Notes Filter: ${selectedTag} | NoteHub`,
    description: `Browse NoteHub notes filtered by ${selectedTag}.`,
    openGraph: {
      title: `Notes Filter: ${selectedTag} | NoteHub`,
      description: `Browse NoteHub notes filtered by ${selectedTag}.`,
      url: `/notes/filter/${encodeURIComponent(tagFromUrl)}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub ${selectedTag} filter`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;
  const tagFromUrl = slug?.[0] ?? "all";
  const selectedTag =
    tagFromUrl === "all" ? undefined : decodeURIComponent(tagFromUrl);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, selectedTag ?? "all"],
    queryFn: () => fetchNotes(1, 12, "", selectedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={selectedTag} />
    </HydrationBoundary>
  );
}
