import { NextResponse } from 'next/server';
import { DRUPAL_BASE_URL } from '@/config/drupal';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('type');
    
    if (!contentType) {
      return NextResponse.json(
        { error: 'Content type is required' },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const response = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/${contentType}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      }
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Drupal API Hatası:', {
        status: response.status,
        statusText: response.statusText,
        error
      });
      return NextResponse.json(
        { error: `API Hatası: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('İçerik alma hatası:', error);
    return NextResponse.json(
      { error: 'İçerik alınamadı' },
      { status: 500 }
    );
  }
} 