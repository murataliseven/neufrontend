'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DRUPAL_BASE_URL, DRUPAL_CLIENT_ID, SITE_URL } from '@/config/drupal';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    console.log('Login sayfası yüklendi');
    console.log('Code:', code);
    console.log('State:', state);
    
    if (!code) {
      console.log('Code yok, OAuth akışı başlatılıyor...');
      const newState = Math.random().toString(36).substring(7);
      localStorage.setItem('oauth_state', newState);
      
      const authUrl = new URL('/oauth/authorize', DRUPAL_BASE_URL);
      authUrl.searchParams.append('response_type', 'code');
      authUrl.searchParams.append('client_id', DRUPAL_CLIENT_ID);
      authUrl.searchParams.append('redirect_uri', `${SITE_URL}/login`);
      authUrl.searchParams.append('state', newState);
      authUrl.searchParams.append('scope', 'consumer');
      
      const finalUrl = authUrl.toString();
      console.log('Yönlendirme URL:', finalUrl);
      
      window.location.href = finalUrl;
      return;
    }

    // Authorization code ile token al
    const getToken = async () => {
      try {
        console.log('Token alma işlemi başlatılıyor...');
        
        const response = await fetch('/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            code,
            redirect_uri: `${SITE_URL}/login`
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Token alınamadı');
        }

        const data = await response.json();
        console.log('Token yanıtı:', data);
        
        const { access_token } = data;
        if (!access_token) {
          throw new Error('Token yanıtında access_token bulunamadı');
        }
        
        // Token'ı cookie'ye kaydet
        document.cookie = `auth_token=${access_token}; path=/; secure; samesite=lax`;
        localStorage.removeItem('oauth_state');
        
        router.push('/dashboard');
      } catch (error) {
        console.error('Token alınamadı:', error);
      }
    };

    getToken();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Giriş İşlemi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Drupal kimlik doğrulama işlemi devam ediyor...
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            Lütfen bekleyin...
          </p>
          <div className="mt-4 text-xs text-gray-400">
            <p>Debug Bilgileri:</p>
            <p>Code: {searchParams.get('code')?.substring(0, 30)}...</p>
            <p>State: {searchParams.get('state')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 