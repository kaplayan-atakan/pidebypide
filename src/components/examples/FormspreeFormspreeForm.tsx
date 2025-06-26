'use client';

import { useState } from 'react';

// Formspree ile çalışan Franchise başvuru formu
export default function FormspreeFormspreeForm() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null as string | null
  });

  const [formData, setFormData] = useState({
    adSoyad: '',
    email: '',
    telefon: '',
    il: '',
    ilce: '',
    yatirimMiktari: '',
    mesaj: '',
    kvkkOnay: false,
    franchiseOnay: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, submitting: true });

    try {
      const response = await fetch('https://formspree.io/f/FRANCHISE_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus({
          submitted: true,
          submitting: false,
          error: null
        });
        setFormData({
          adSoyad: '',
          email: '',
          telefon: '',
          il: '',
          ilce: '',
          yatirimMiktari: '',
          mesaj: '',
          kvkkOnay: false,
          franchiseOnay: false
        });
      } else {
        const data = await response.json();
        setFormStatus({
          submitted: false,
          submitting: false,
          error: data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.'
        });
      }
    } catch (error) {
      setFormStatus({
        submitted: false,
        submitting: false,
        error: 'Bir hata oluştu. Lütfen tekrar deneyin.'
      });
      console.error('Form gönderme hatası:', error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {formStatus.submitted ? (
        <div className="p-4 bg-green-50 text-green-700 rounded-md">
          <h3 className="text-lg font-medium mb-2">Başvurunuz Alındı!</h3>
          <p>Franchise başvurunuz başarıyla gönderildi. İncelendikten sonra sizinle iletişime geçeceğiz.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adSoyad" className="block mb-1 text-sm font-medium">
              Ad Soyad*
            </label>
            <input
              type="text"
              id="adSoyad"
              name="adSoyad"
              value={formData.adSoyad}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                E-posta*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="telefon" className="block mb-1 text-sm font-medium">
                Telefon*
              </label>
              <input
                type="tel"
                id="telefon"
                name="telefon"
                value={formData.telefon}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="il" className="block mb-1 text-sm font-medium">
                İl*
              </label>
              <input
                type="text"
                id="il"
                name="il"
                value={formData.il}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="ilce" className="block mb-1 text-sm font-medium">
                İlçe*
              </label>
              <input
                type="text"
                id="ilce"
                name="ilce"
                value={formData.ilce}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="yatirimMiktari" className="block mb-1 text-sm font-medium">
              Yatırım Miktarı*
            </label>
            <select
              id="yatirimMiktari"
              name="yatirimMiktari"
              value={formData.yatirimMiktari}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Seçiniz</option>
              <option value="100.000 - 250.000 TL">100.000 - 250.000 TL</option>
              <option value="250.000 - 500.000 TL">250.000 - 500.000 TL</option>
              <option value="500.000 - 750.000 TL">500.000 - 750.000 TL</option>
              <option value="750.000 - 1.000.000 TL">750.000 - 1.000.000 TL</option>
              <option value="1.000.000 TL ve üzeri">1.000.000 TL ve üzeri</option>
            </select>
          </div>

          <div>
            <label htmlFor="mesaj" className="block mb-1 text-sm font-medium">
              Eklemek İstedikleriniz
            </label>
            <textarea
              id="mesaj"
              name="mesaj"
              value={formData.mesaj}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              id="kvkkOnay"
              name="kvkkOnay"
              checked={formData.kvkkOnay as boolean}
              onChange={handleChange}
              className="mt-1 mr-2"
              required
            />
            <label htmlFor="kvkkOnay" className="text-sm">
              KVKK kapsamında kişisel verilerimin işlenmesine izin veriyorum.*
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="franchiseOnay"
              name="franchiseOnay"
              checked={formData.franchiseOnay as boolean}
              onChange={handleChange}
              className="mt-1 mr-2"
              required
            />
            <label htmlFor="franchiseOnay" className="text-sm">
              Franchise şartlarını kabul ediyorum.*
            </label>
          </div>

          {formStatus.error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
              <p>{formStatus.error}</p>
            </div>
          )}

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-md"
              disabled={formStatus.submitting}
            >
              {formStatus.submitting ? 'Gönderiliyor...' : 'Başvuru Yap'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
