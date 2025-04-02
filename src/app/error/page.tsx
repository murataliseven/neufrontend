export default function Error() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Hata</h1>
      <p className="mt-4">Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">Ana sayfaya dön</a>
    </div>
  );
} 