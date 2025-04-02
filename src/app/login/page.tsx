'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { DRUPAL_BASE_URL, DRUPAL_CLIENT_ID, SITE_URL } from '@/config/drupal';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      // Token almak için API'ye istek at
      fetch('/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          redirect_uri: `${SITE_URL}/login`,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.access_token) {
          // Token'ı cookie'ye kaydet ve dashboard'a yönlendir
          document.cookie = `auth_token=${data.access_token}; path=/`;
          router.push('/dashboard');
        } else {
          console.error('Token alınamadı:', data.error);
        }
      })
      .catch(error => {
        console.error('Token alma hatası:', error);
      });
    } else {
      // Drupal OAuth login sayfasına yönlendir
      const authUrl = `${DRUPAL_BASE_URL}/oauth/authorize?` + new URLSearchParams({
        response_type: 'code',
        client_id: DRUPAL_CLIENT_ID,
        redirect_uri: `${SITE_URL}/login`,
        scope: 'consumer'
      });
      window.location.href = authUrl;
    }
  }, [code, router]);

  return null;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
} 