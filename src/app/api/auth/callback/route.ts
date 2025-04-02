import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { code } = await request.json();

  if (!code) {
    return NextResponse.json(
      { error: "Code is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("https://ubor.positive.uno/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.DRUPAL_CLIENT_ID || "YEHX2rKuSoKd-j7SyxF7FkOgvCdFnTblfchO-5NmA_s",
        client_secret: process.env.DRUPAL_CLIENT_SECRET || "",
        code: code,
        redirect_uri: "https://positive.uno/login",
      }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Authentication failed",
          message: data.error_description || "Token alınırken bir hata oluştu",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server error",
        message: "Beklenmeyen bir hata oluştu",
      },
      { status: 500 }
    );
  }
} 