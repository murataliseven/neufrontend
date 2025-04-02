'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContentItem {
  id: string;
  attributes: {
    title: string;
    field_kod: string;
  };
}

export default function DashboardPage() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch('/api/content?type=icerik_turu');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'İçerik yüklenirken hata oluştu');
        }

        const data = await response.json();
        setContents(data.data || []);
      } catch (err) {
        console.error('Veri çekme hatası:', err);
        setError(err instanceof Error ? err.message : 'İçerik yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.attributes.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Kod: {item.attributes.field_kod}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 