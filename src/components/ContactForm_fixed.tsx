'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  adSoyad: string;
  email: string;
  telefon: string;
  konu: string;
  mesaj: string;
  kvkkOnay: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    adSoyad: '',
    email: '',
    telefon: '',
    konu: '',
    mesaj: '',
    kvkkOnay: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Hata mesajını temizle
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.adSoyad.trim()) {
      newErrors.adSoyad = 'Ad soyad gereklidir';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email adresi gereklidir';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi girin';
    }

    if (!formData.konu) {
      newErrors.konu = 'Konu seçimi gereklidir';
    }

    if (!formData.mesaj.trim()) {
      newErrors.mesaj = 'Mesaj gereklidir';
    } else if (formData.mesaj.trim().length < 10) {
      newErrors.mesaj = 'Mesaj en az 10 karakter olmalıdır';
    }

    if (!formData.kvkkOnay) {
      newErrors.kvkkOnay = 'KVKK onayı gereklidir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitResult({ success: true, message: result.message });
        // Formu sıfırla
        setFormData({
          adSoyad: '',
          email: '',
          telefon: '',
          konu: '',
          mesaj: '',
          kvkkOnay: false
        });
      } else {
        setSubmitResult({ success: false, message: result.error || 'Bir hata oluştu' });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitResult({ 
        success: false, 
        message: 'Bağlantı hatası. Lütfen tekrar deneyin.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitResult && (
        <div className={`p-4 rounded-lg ${
          submitResult.success 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {submitResult.message}
        </div>
      )}

      {/* Ad Soyad */}
      <div>
        <label htmlFor="adSoyad" className="block text-sm font-medium text-gray-700 mb-2">
          Ad Soyad <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="adSoyad"
          name="adSoyad"
          value={formData.adSoyad}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f29b24] focus:border-transparent transition-colors ${
            errors.adSoyad ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Adınızı ve soyadınızı girin"
        />
        {errors.adSoyad && (
          <p className="mt-1 text-sm text-red-600">{errors.adSoyad}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Adresi <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f29b24] focus:border-transparent transition-colors ${
            errors.email ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="ornek@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Telefon */}
      <div>
        <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-2">
          Telefon Numarası
        </label>
        <input
          type="tel"
          id="telefon"
          name="telefon"
          value={formData.telefon}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f29b24] focus:border-transparent transition-colors"
          placeholder="0555 123 45 67"
        />
      </div>

      {/* Konu */}
      <div>
        <label htmlFor="konu" className="block text-sm font-medium text-gray-700 mb-2">
          Konu <span className="text-red-500">*</span>
        </label>
        <select
          id="konu"
          name="konu"
          value={formData.konu}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f29b24] focus:border-transparent transition-colors ${
            errors.konu ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Konu seçin</option>
          <option value="genel">Genel Bilgi</option>
          <option value="sikayet">Şikayet</option>
          <option value="oneri">Öneri</option>
          <option value="franchise">Franchise</option>
          <option value="kariyer">Kariyer</option>
          <option value="tedarik">Tedarik ve İş Ortaklığı</option>
          <option value="medya">Basın ve Medya</option>
        </select>
        {errors.konu && (
          <p className="mt-1 text-sm text-red-600">{errors.konu}</p>
        )}
      </div>

      {/* Mesaj */}
      <div>
        <label htmlFor="mesaj" className="block text-sm font-medium text-gray-700 mb-2">
          Mesajınız <span className="text-red-500">*</span>
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          value={formData.mesaj}
          onChange={handleInputChange}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f29b24] focus:border-transparent transition-colors resize-vertical ${
            errors.mesaj ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Mesajınızı buraya yazın..."
        />
        {errors.mesaj && (
          <p className="mt-1 text-sm text-red-600">{errors.mesaj}</p>
        )}
        <p className="mt-1 text-sm text-gray-500">
          {formData.mesaj.length}/500 karakter
        </p>
      </div>

      {/* KVKK Onayı */}
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="kvkkOnay"
          name="kvkkOnay"
          checked={formData.kvkkOnay}
          onChange={handleInputChange}
          className={`mt-1 w-4 h-4 text-[#f29b24] border-gray-300 rounded focus:ring-[#f29b24] ${
            errors.kvkkOnay ? 'border-red-300' : ''
          }`}
        />
        <label htmlFor="kvkkOnay" className="text-sm text-gray-700">
          <span className="text-red-500">*</span> 
          <a href="/kisisel-verilerin-korunmasi" target="_blank" className="text-[#14543c] hover:text-[#f29b24] underline ml-1">
            KVKK Aydınlatma Metni
          </a>
          &apos;ni okudum ve kişisel verilerimin işlenmesine onay veriyorum.
        </label>
      </div>
      {errors.kvkkOnay && (
        <p className="text-sm text-red-600">{errors.kvkkOnay}</p>
      )}

      {/* Gönder Butonu */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#14543c] hover:bg-[#0f3d2a] focus:ring-4 focus:ring-[#f29b24] focus:ring-opacity-50'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Gönderiliyor...</span>
            </div>
          ) : (
            'Mesajı Gönder'
          )}
        </button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Mesajınıza en geç 24 saat içerisinde yanıt vereceğiz.</p>
      </div>
    </form>
  );
}
