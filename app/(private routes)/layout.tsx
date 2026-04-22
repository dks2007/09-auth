import type { ReactNode } from "react";

interface PrivateRoutesLayoutProps {
  children: ReactNode;
}

export default function PrivateRoutesLayout({ children }: PrivateRoutesLayoutProps) {
  return children;
}
