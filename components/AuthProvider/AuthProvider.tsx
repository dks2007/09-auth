"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { checkSession, getMe, logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

interface AuthProviderProps {
  children: ReactNode;
}

const PRIVATE_PREFIXES = ["/notes", "/profile"];
const AUTH_PAGES = ["/sign-in", "/sign-up"];

const isPrivateRoute = (pathname: string) =>
  PRIVATE_PREFIXES.some((prefix) => pathname.startsWith(prefix));

const isAuthRoute = (pathname: string) => AUTH_PAGES.includes(pathname);

export default function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    let isMounted = true;

    const syncSession = async () => {
      setIsChecking(true);

      try {
        const session = await checkSession();

        if (!session.success) {
          clearIsAuthenticated();

          if (isPrivateRoute(pathname)) {
            await logout().catch(() => undefined);
            router.replace("/sign-in");
          }

          return;
        }

        const me = await getMe();
        setUser(me);

        if (isAuthRoute(pathname)) {
          router.replace("/");
        }
      } catch {
        clearIsAuthenticated();

        if (isPrivateRoute(pathname)) {
          router.replace("/sign-in");
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    syncSession();

    return () => {
      isMounted = false;
    };
  }, [pathname, clearIsAuthenticated, router, setUser]);

  if (isChecking && isPrivateRoute(pathname)) {
    return <Loader />;
  }

  return <>{children}</>;
}
