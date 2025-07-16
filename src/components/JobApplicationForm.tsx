"use client";
import { branches } from '@/data/branches';

import { useState, FormEvent } from 'react';

interface FormData {
  ad_soyad: string;
  email: string;
  telefon: string;
  pozisyon: string;
  sube: string;
  deneyim: string;
  mesaj: string;
  kvkk: boolean;
}

export default function JobApplicationForm() {
  const [formData, setFormData] = useState<FormData>({
    ad_soyad: '',
    email: '',
    telefon: '',
    pozisyon: '',
    sube: '',
    deneyim: '',
    mesaj: '',
    kvkk: false
  });
  
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData | 'cv', string>>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Hata mesajını temizle
    if (errors[name as keyof FormData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormData];
        return newErrors;
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ 
          ...prev, 
          cv: 'CV dosyası 5MB\'dan büyük olamaz.' 
        }));
        return;
      }
      
      // Dosya formatı kontrolü
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ 
          ...prev, 
          cv: 'CV dosyası yalnızca PDF, DOC veya DOCX formatında olabilir.' 
        }));
        return;
      }
      
      setCvFile(file);
      
      // Hata mesajını temizle
      if (errors.cv) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.cv;
          return newErrors;
        });
      }
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData | 'cv', string>> = {};
    
    // Ad soyad kontrolü
    if (!formData.ad_soyad.trim()) {
      newErrors.ad_soyad = 'Ad soyad alanı zorunludur';
    }
    
    // Email kontrolü
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta alanı zorunludur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    
    // Telefon kontrolü
    if (!formData.telefon.trim()) {
      newErrors.telefon = 'Telefon alanı zorunludur';
    } else if (!/^[0-9]{10,11}$/.test(formData.telefon.replace(/\s+/g, ''))) {
      newErrors.telefon = 'Geçerli bir telefon numarası giriniz';
    }
    
    // Pozisyon kontrolü
    if (!formData.pozisyon) {
      newErrors.pozisyon = 'Pozisyon seçimi zorunludur';
    }
    
    // KVKK onayı kontrolü
    if (!formData.kvkk) {
      newErrors.kvkk = 'KVKK aydınlatma metnini kabul etmelisiniz';
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
    
    // Form verilerini hazırla
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value.toString());
    });
    
    if (cvFile) {
      formDataToSend.append('cv', cvFile);
    }
    
    try {
      // API endpoint'i
      const response = await fetch('/api/kariyer-basvuru', {
        method: 'POST',
        body: formDataToSend,
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitResult({
          success: true,
          message: 'Başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.'
        });
        // Formu temizle
        setFormData({
          ad_soyad: '',
          email: '',
          telefon: '',
          pozisyon: '',
          sube: '',
          deneyim: '',
          mesaj: '',
          kvkk: false
        });
        setCvFile(null);
        
        // Form elementini sıfırla (özellikle file input için)
        const form = document.getElementById('job-application-form') as HTMLFormElement;
        if (form) form.reset();
      } else {
        setSubmitResult({
          success: false,
          message: data.message || 'Başvurunuz gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.'
        });
      }
    } catch (error: unknown) {
      console.error('Başvuru gönderme hatası:', error);
      setSubmitResult({
        success: false,
        message: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-5 md:p-6 h-full">
      <h2 className="text-xl md:text-2xl font-bold font-header text-[#14543c] mb-4">
        İş Başvurusu
      </h2>
      
      {submitResult && (
        <div 
          className={`mb-5 p-3 rounded-md ${
            submitResult.success 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {submitResult.message}
        </div>
      )}
      
      <form id="job-application-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ad_soyad" className="block text-sm font-medium text-gray-700 mb-1">
            Ad Soyad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="ad_soyad"
            name="ad_soyad"
            value={formData.ad_soyad}
            onChange={handleInputChange}
            className={`w-full border ${errors.ad_soyad ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]`}
            aria-describedby={errors.ad_soyad ? 'ad_soyad-error' : undefined}
            required
          />
          {errors.ad_soyad && (
            <p id="ad_soyad-error" className="mt-1 text-sm text-red-600">
              {errors.ad_soyad}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-posta <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]`}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
            Telefon <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="telefon"
            name="telefon"
            value={formData.telefon}
            onChange={handleInputChange}
            placeholder="5XXXXXXXXX"
            className={`w-full border ${errors.telefon ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]`}
            aria-describedby={errors.telefon ? 'telefon-error' : undefined}
            required
          />
          {errors.telefon && (
            <p id="telefon-error" className="mt-1 text-sm text-red-600">
              {errors.telefon}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="pozisyon" className="block text-sm font-medium text-gray-700 mb-1">
            Başvurulan Pozisyon <span className="text-red-500">*</span>
          </label>
          <select
            id="pozisyon"
            name="pozisyon"
            value={formData.pozisyon}
            onChange={handleInputChange}
            className={`w-full border ${errors.pozisyon ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]`}
            aria-describedby={errors.pozisyon ? 'pozisyon-error' : undefined}
            required
          >
            <option value="">Pozisyon Seçiniz</option>
            <option value="Şef/Aşçı">Şef/Aşçı</option>
            <option value="Garson/Servis">Garson/Servis Elemanı</option>
            <option value="Şube Müdürü">Şube Müdürü</option>
            <option value="Diğer">Diğer</option>
          </select>
          {errors.pozisyon && (
            <p id="pozisyon-error" className="mt-1 text-sm text-red-600">
              {errors.pozisyon}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="sube" className="block text-sm font-medium text-gray-700 mb-1">
            Tercih Edilen Şube
          </label>
          <select
            id="sube"
            name="sube"
            value={formData.sube}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]"
          >
            <option value="">Şube Seçiniz</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.name}>{branch.name}</option>
            ))}
            <option value="Diğer">Diğer</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="deneyim" className="block text-sm font-medium text-gray-700 mb-1">
            Deneyim (Yıl)
          </label>
          <input
            type="number"
            id="deneyim"
            name="deneyim"
            value={formData.deneyim}
            onChange={handleInputChange}
            min="0"
            max="50"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]"
          />
        </div>
        
        <div>
          <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
            CV Yükle
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className={`w-full border ${errors.cv ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]`}
            aria-describedby={errors.cv ? 'cv-error' : 'cv-help'}
          />
          {errors.cv ? (
            <p id="cv-error" className="mt-1 text-sm text-red-600">
              {errors.cv}
            </p>
          ) : (
            <p id="cv-help" className="mt-1 text-xs text-gray-500">
              PDF, DOC veya DOCX formatında (Maks. 5MB)
              {cvFile && (
                <span className="block mt-1 text-[#14543c]">
                  Seçilen dosya: {cvFile.name} ({Math.round(cvFile.size / 1024)} KB)
                </span>
              )}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="mesaj" className="block text-sm font-medium text-gray-700 mb-1">
            Ek Bilgiler
          </label>
          <textarea
            id="mesaj"
            name="mesaj"
            value={formData.mesaj}
            onChange={handleInputChange}
            rows={4}
            placeholder="Kendinizi tanıtın..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]"
          ></textarea>
        </div>
        
        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              name="kvkk"
              checked={formData.kvkk}
              onChange={handleInputChange}
              className={`mt-1 h-4 w-4 rounded border ${errors.kvkk ? 'border-red-300' : 'border-gray-300'} text-[#14543c] focus:ring-[#14543c]`}
              aria-describedby={errors.kvkk ? 'kvkk-error' : undefined}
              required
            />
            <span className="ml-2 text-sm text-gray-700">
              <a 
                href="/kisisel-verilerin-korunmasi" 
                target="_blank" 
                className="text-[#14543c] hover:text-[#0f3d2a] underline"
              >
                KVKK Aydınlatma Metni
              </a>
              {'\''}ni okudum ve kabul ediyorum.
              <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
          {errors.kvkk && (
            <p id="kvkk-error" className="mt-1 text-sm text-red-600 pl-6">
              {errors.kvkk}
            </p>
          )}
        </div>
        
        <div className="mt-4">
          <div className="g-recaptcha" data-sitekey="6LdnK4IaAAAAAF8dCYxS9oMNMEq5jjHxZOB--4-k"></div>
        </div>
        
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-[#14543c] hover:bg-[#0f3d2a] text-white font-bold py-3 px-4 rounded-md transition duration-200 disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'GÖNDERİLİYOR...' : 'BAŞVURU GÖNDER'}
          </button>
        </div>
      </form>
    </div>
  );
}
