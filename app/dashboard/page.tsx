"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { getCurrentUser, clearAuthData } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { User } from "@/lib/users";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if component is mounted
    let isMounted = true;

    const loadUser = async () => {
      try {
        // Add a small delay to avoid synchronous setState
        await new Promise((resolve) => setTimeout(resolve, 0));

        if (isMounted) {
          const currentUser = getCurrentUser();
          setUser(currentUser);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to load user:", error);
          setIsLoading(false);
        }
      }
    };

    loadUser();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    clearAuthData();
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
              </div>
              <div className="flex items-center">
                <Button
                  onClick={handleLogout}
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {user && (
            <>
              <Button className="mb-4">
                <Link href="/">Go Home</Link>
              </Button>
              <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-6 text-2xl font-bold">
                  Welcome, {user.fullName || user.email}!
                </h2>

                <div className="grid gap-6 md:grid-cols-2"></div>
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
