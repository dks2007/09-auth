"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PrivateRoutesLayoutProps {
  children: ReactNode;
}

export default function PrivateRoutesLayout({ children }: PrivateRoutesLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return children;
}
