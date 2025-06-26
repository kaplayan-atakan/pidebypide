'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  useEffect(() => {
    // Eğer üretim ortamındaysa ve basePath tanımlıysa ana sayfaya yönlendir
    if (process.env.NODE_ENV === 'production') {
      router.push('/pidebypide');
    } else {
      router.push('/');
    }
  }, [router]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Sayfaya Yönlendiriliyorsunuz...</h1>
      <p className="text-xl mb-8">Lütfen bekleyin, ana sayfaya yönlendiriliyorsunuz.</p>
    </div>
  );
}
