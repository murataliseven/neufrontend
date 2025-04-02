import { NextResponse } from 'next/server';
import { DRUPAL_BASE_URL, DRUPAL_CLIENT_ID, DRUPAL_CLIENT_SECRET } from '@/config/drupal';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, redirect_uri } = body;

    if (!code || !redirect_uri) {
      return NextResponse.json(
        { error: 'Code ve redirect_uri gerekli' },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: DRUPAL_CLIENT_ID,
      client_secret: DRUPAL_CLIENT_SECRET,
      redirect_uri: redirect_uri,
      code: code,
      scope: 'consumer'
    });

    console.log('Token isteği gönderiliyor:', {
      url: `${DRUPAL_BASE_URL}/oauth/token`,
      formData: formData.toString()
    });

    const response = await fetch(`${DRUPAL_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formData.toString()
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Token alma hatası:', {
        status: response.status,
        statusText: response.statusText,
        error
      });
      return NextResponse.json(
        { error: `Token alınamadı: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Token alma hatası:', error);
    return NextResponse.json(
      { error: 'Token alınamadı' },
      { status: 500 }
    );
  }
} 