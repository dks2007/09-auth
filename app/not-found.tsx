import type { Metadata } from "next";

const styles = {
  title: {
    marginTop: "64px",
    textAlign: "center",
    fontSize: "36px",
    color: "#212529",
  },
  description: {
    marginTop: "12px",
    textAlign: "center",
    fontSize: "18px",
    color: "#495057",
  },
} as const;

export const metadata: Metadata = {
  title: "404 | NoteHub",
  description: "The requested NoteHub page does not exist.",
  alternates: {
    canonical: "/not-found",
  },
  openGraph: {
    title: "404 | NoteHub",
    description: "The requested NoteHub page does not exist.",
    url: "/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 page",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main>
      <h1 style={styles.title}>404 - Page not found</h1>
      <p style={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
