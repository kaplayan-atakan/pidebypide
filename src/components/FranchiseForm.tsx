'use client';

import { useState, FormEvent } from 'react';

export default function FranchiseForm() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    work: '',
    city: '',
    location: '',
    privacyPolicy: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      // Form gönderim API'si
      const response = await fetch('/api/franchise-basvuru', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitResult({
          success: true,
          message: 'Başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.'
        });
        // Formu sıfırla
        setFormData({
          fullname: '',
          email: '',
          phone: '',
          work: '',
          city: '',
          location: '',
          privacyPolicy: false
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.'
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      {submitResult && (
        <div className={`mb-6 p-4 rounded-md ${submitResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'} border ${submitResult.success ? 'border-green-200' : 'border-red-200'}`}>
          {submitResult.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-y-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="fullname" className="md:w-1/3 text-gray-700 font-medium mb-1 md:mb-0">
              Ad Soyad
            </label>
            <div className="md:w-2/3">
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="email" className="md:w-1/3 text-gray-700 font-medium mb-1 md:mb-0">
              E-posta
            </label>
            <div className="md:w-2/3">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="phone" className="md:w-1/3 text-gray-700 font-medium mb-1 md:mb-0">
              Telefon
            </label>
            <div className="md:w-2/3">
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="5XXXXXXXXX"
                maxLength={11}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="work" className="md:w-1/3 text-gray-700 font-medium mb-1 md:mb-0">
              Şu An Yaptığınız İş
            </label>
            <div className="md:w-2/3">
              <input
                type="text"
                id="work"
                name="work"
                value={formData.work}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="city" className="md:w-1/3 text-gray-700 font-medium mb-1 md:mb-0">
              Franchise Açmak İstediğiniz Şehir
            </label>
            <div className="md:w-2/3">
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center">
            <label htmlFor="location" className="md:w-1/3 text-gray-700 font-medium mb-1 md:mb-0">
              Lokasyon (Bölge/AVM/Cadde)
            </label>
            <div className="md:w-2/3">
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#14543c]"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-[#14543c]"
                  required
                />
                <span className="ml-2 text-sm text-gray-700">
                  <a 
                    href="/kisisel-verilerin-korunmasi" 
                    target="_blank"
                    className="text-[#14543c] hover:text-[#f29b24]"
                  >
                    Kişisel Verilerin Korunması Gizlilik Politikası
                  </a>&apos;nı okudum ve kabul ediyorum.
                </span>
              </label>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <div className="g-recaptcha mb-4" data-sitekey="6LdnK4IaAAAAAF8dCYxS9oMNMEq5jjHxZOB--4-k"></div>
              <p className="text-xs text-gray-500 mb-4">
                Bu site reCAPTCHA tarafından korunmaktadır ve Google 
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="mx-1 text-[#14543c] hover:underline">Gizlilik Politikası</a>ve
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="ml-1 text-[#14543c] hover:underline">Hizmet Şartları</a> geçerlidir.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row mt-6">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                type="submit"
                className="bg-[#14543c] hover:bg-[#0e3d2a] text-white font-bold py-3 px-8 rounded-md transition duration-200 shadow-md flex items-center justify-center w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse mr-2">●</span>
                    <span>GÖNDERİLİYOR...</span>
                  </>
                ) : (
                  'GÖNDER'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
