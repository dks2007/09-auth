import type { ReactNode } from "react";

interface NotesFilterLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#2c2c2c",
    color: "white",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #ddd",
  },
  notesWrapper: {
    width: "100%",
  },
} as const;

export default function NotesFilterLayout({
  children,
  sidebar,
}: NotesFilterLayoutProps) {
  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>{sidebar}</aside>
      <div style={styles.notesWrapper}>{children}</div>
    </div>
  );
}
