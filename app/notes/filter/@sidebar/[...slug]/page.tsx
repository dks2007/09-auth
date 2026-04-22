import SidebarNotes from "../SidebarNotes";

interface SidebarPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function SidebarPage({ params }: SidebarPageProps) {
  const { slug } = await params;
  const currentTag = slug?.[0] ?? "all";

  return <SidebarNotes currentTag={decodeURIComponent(currentTag)} />;
}
