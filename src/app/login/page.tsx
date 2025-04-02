'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { DRUPAL_BASE_URL, DRUPAL_CLIENT_ID, SITE_URL } from '@/config/drupal';

export default function LoginCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      // Next.js API route'una code'u göndererek token al
      fetch("/api/auth/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error("Login failed:", data.message);
            router.push("/error");
          } else {
            console.log("Token:", data.access_token);
            document.cookie = `auth_token=${data.access_token}; path=/; secure; samesite=strict`;
            if (data.refresh_token) {
              document.cookie = `refresh_token=${data.refresh_token}; path=/; secure; samesite=strict`;
            }
            router.push("/dashboard");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          router.push("/error");
        });
    }
  }, [router, searchParams]);

  return <div>Giriş işlemi devam ediyor...</div>;
} 