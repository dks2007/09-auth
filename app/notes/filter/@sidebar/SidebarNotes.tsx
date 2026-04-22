import Link from "next/link";
import type { NoteTag } from "../../../../types/note";

interface SidebarNotesProps {
  currentTag: string;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const styles = {
  menuList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    marginBottom: "16px",
  },
  menuLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    display: "block",
    padding: "8px 16px",
  },
} as const;

export default function SidebarNotes({ currentTag }: SidebarNotesProps) {
  return (
    <ul style={styles.menuList}>
      <li style={styles.menuItem}>
        <Link
          href="/notes/filter/all"
          prefetch={false}
          style={styles.menuLink}
          aria-current={currentTag === "all" ? "page" : undefined}
        >
          All notes
        </Link>
      </li>
      {TAGS.map((tag) => (
        <li key={tag} style={styles.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            prefetch={false}
            style={styles.menuLink}
            aria-current={currentTag === tag ? "page" : undefined}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
