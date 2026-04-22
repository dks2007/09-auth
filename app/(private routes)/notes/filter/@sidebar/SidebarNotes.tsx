import Link from "next/link";
import type { NoteTag } from "@/types/note";
import css from "./SidebarNotes.module.css";

interface SidebarNotesProps {
  currentTag: string;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes({ currentTag }: SidebarNotesProps) {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href="/notes/filter/all"
          prefetch={false}
          className={css.menuLink}
          aria-current={currentTag === "all" ? "page" : undefined}
        >
          All notes
        </Link>
      </li>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            prefetch={false}
            className={css.menuLink}
            aria-current={currentTag === tag ? "page" : undefined}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
