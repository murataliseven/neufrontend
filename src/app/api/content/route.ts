import { NextRequest, NextResponse } from 'next/server';
import { DRUPAL_BASE_URL } from '@/config/drupal';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const contentType = searchParams.get('type');
  
  if (!contentType) {
    return NextResponse.json(
      { error: 'Content type is required' },
      { status: 400 }
    );
  }

  // Cookie'yi doğrudan request'ten alıyoruz
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/${contentType}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Content fetch error:', {
        status: response.status,
        statusText: response.statusText
      });
      return NextResponse.json(
        { error: `Content fetch failed: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Content fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
} 