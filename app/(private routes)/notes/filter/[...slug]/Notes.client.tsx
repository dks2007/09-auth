"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";
import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "../../NotesPage.module.css";

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", search, page, initialTag ?? "all"],
    queryFn: () => fetchNotes(page, 12, search, initialTag),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    debouncedSetSearch(value);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <Link
          className={css.button}
          href="/notes/action/create"
          prefetch={false}
        >
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
