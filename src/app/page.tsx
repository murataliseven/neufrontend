'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Kullanıcı zaten login yapmış mı kontrol et
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (token) {
      // Token varsa dashboard'a yönlendir
      router.push("/dashboard");
    } else {
      // Token yoksa Drupal'a yönlendir
      const authorizeUrl = `https://ubor.positive.uno/oauth/authorize?client_id=YEHX2rKuSoKd-j7SyxF7FkOgvCdFnTblfchO-5NmA_s&redirect_uri=https://positive.uno/login&response_type=code&scope=consumer`;
      window.location.href = authorizeUrl;
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">Yönlendiriliyor...</p>
    </div>
  );
}
