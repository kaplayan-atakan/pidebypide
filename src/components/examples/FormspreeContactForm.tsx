'use client';

import { useState } from 'react';

// Formspree form örneği
export default function StaticContactFormExample() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    error: null as string | null
  });

  const [formData, setFormData] = useState({
    adSoyad: '',
    email: '',
    telefon: '',
    konu: '',
    mesaj: '',
    kvkkOnay: false
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
      const response = await fetch('https://formspree.io/f/FORMSPREE_ID_BURAYA', {
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
          konu: '',
          mesaj: '',
          kvkkOnay: false
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
          <h3 className="text-lg font-medium mb-2">Teşekkür Ederiz!</h3>
          <p>Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.</p>
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
              Telefon
            </label>
            <input
              type="tel"
              id="telefon"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="konu" className="block mb-1 text-sm font-medium">
              Konu*
            </label>
            <input
              type="text"
              id="konu"
              name="konu"
              value={formData.konu}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="mesaj" className="block mb-1 text-sm font-medium">
              Mesajınız*
            </label>
            <textarea
              id="mesaj"
              name="mesaj"
              value={formData.mesaj}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex items-start">
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
              {formStatus.submitting ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
