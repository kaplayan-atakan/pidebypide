"use client";
import { branches } from '@/data/branches';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import ReCAPTCHA from 'react-google-recaptcha';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import OpinionBar from '@/components/UI/OpinionBar';
import Link from 'next/link';

// Form veri tipi
type FormData = {
  ad_soyad: string;
  email: string;
  telefon: string;
  sube: string;
  konu: string;
  mesaj: string;
  puan: string;
  kvkk: boolean;
};

export default function GorusVeOnerileriniz() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  // const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormData>();

  // const handleCaptchaChange = (value: string | null) => {
  //   setCaptchaValue(value);
  // };

  const onSubmit = async (data: FormData) => {
    // if (!captchaValue) {
    //   setSubmitError('Lütfen robot olmadığınızı doğrulayın.');
    //   return;
    // }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/gorus-ve-onerileriniz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          // recaptcha: captchaValue, // API'ye recaptcha olarak gönderiyoruz
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        window.scrollTo(0, 0);
      } else {
        setSubmitError(result.message || 'Gönderim sırasında bir hata oluştu.');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSubmitError('Gönderim sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      console.error('Form gönderim hatası:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="layout--gorus-ve-onerileriniz bg-white min-h-screen">
      <OpinionBar />
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* İçerik Bölümü */}
        <div className="container mx-auto px-4 py-12">
          {submitSuccess ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Teşekkürler!</h3>
                  <div className="mt-2 text-green-700">
                    <p>Görüş ve önerileriniz başarıyla gönderildi. Değerlendirmeleriniz için teşekkür ederiz.</p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                      Yeni Görüş Bildir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Sol Taraf - Açıklamalar */}
                  <div className="lg:col-span-7">
                    <h2 className="text-2xl font-bold text-[#14543c] mb-4">Fikirleriniz Bizim İçin Değerli</h2>
                    <p className="text-gray-700 mb-6">
                      Pide By Pide olarak müşteri memnuniyeti bizim için en önemli önceliklerden biridir. 
                      Hizmet kalitemizi sürekli iyileştirmek ve sizlere daha iyi deneyimler sunabilmek için 
                      görüş, öneri ve değerlendirmelerinizi bekliyoruz.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="flex items-center text-lg font-bold text-[#f29b24] mb-2">
                          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Memnuniyet
                        </h3>
                        <p className="text-gray-600">Beğendiğiniz hizmetleri bizimle paylaşın. Olumlu geri bildirimleriniz ekibimizi motive ediyor.</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="flex items-center text-lg font-bold text-[#14543c] mb-2">
                          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                          </svg>
                          Öneri
                        </h3>
                        <p className="text-gray-600">Daha iyi hizmet verebilmemiz için önerilerinizi paylaşın. Her fikir bizim için değerlidir.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="flex items-center text-lg font-bold text-[#f29b24] mb-2">
                          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Şikayet
                        </h3>
                        <p className="text-gray-600">Yaşadığınız olumsuzlukları bildirin. Sorunları hızla çözmek için çalışıyoruz.</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="flex items-center text-lg font-bold text-[#14543c] mb-2">
                          <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                          </svg>
                          Genel Görüş
                        </h3>
                        <p className="text-gray-600">Hizmetlerimiz hakkındaki genel görüşlerinizi bizimle paylaşın.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sağ Taraf - Form */}
                  <div className="lg:col-span-5">
                    <div className="bg-[#14543c] rounded-t-lg">
                      <h3 className="text-white text-xl font-bold py-3 px-4">Görüş ve Öneri Formu</h3>
                    </div>
                    
                    <div className="border border-gray-200 rounded-b-lg p-4">
                      {submitError && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-red-700">{submitError}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                          <label htmlFor="ad_soyad" className="block mb-2 text-sm font-medium text-gray-700">Ad Soyad *</label>
                          <input
                            type="text"
                            id="ad_soyad"
                            className={`w-full px-3 py-2 border ${errors.ad_soyad ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#f29b24] focus:border-[#f29b24]`}
                            {...register('ad_soyad', { required: 'Ad Soyad alanı zorunludur' })}
                          />
                          {errors.ad_soyad && <p className="mt-1 text-sm text-red-600">{errors.ad_soyad.message}</p>}
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">E-posta</label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#f29b24] focus:border-[#f29b24]"
                            {...register('email', { 
                              pattern: { 
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                                message: 'Geçerli bir e-posta adresi giriniz' 
                              } 
                            })}
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="telefon" className="block mb-2 text-sm font-medium text-gray-700">Telefon</label>
                          <input
                            type="tel"
                            id="telefon"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#f29b24] focus:border-[#f29b24]"
                            {...register('telefon')}
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="sube" className="block mb-2 text-sm font-medium text-gray-700">Şube</label>
                          <select
                            id="sube"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#f29b24] focus:border-[#f29b24]"
                            {...register('sube')}
                          >
                            <option value="">Şube Seçiniz</option>
                            {branches.map((branch) => (
                              <option key={branch.id} value={branch.name}>{branch.name}</option>
                            ))}
                            <option value="Genel">Genel</option>
                          </select>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="konu" className="block mb-2 text-sm font-medium text-gray-700">Konu *</label>
                          <select
                            id="konu"
                            className={`w-full px-3 py-2 border ${errors.konu ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#f29b24] focus:border-[#f29b24]`}
                            {...register('konu', { required: 'Konu seçimi zorunludur' })}
                          >
                            <option value="">Konu Seçiniz</option>
                            <option value="Memnuniyet">Memnuniyet</option>
                            <option value="Öneri">Öneri</option>
                            <option value="Şikayet">Şikayet</option>
                            <option value="Genel Görüş">Genel Görüş</option>
                          </select>
                          {errors.konu && <p className="mt-1 text-sm text-red-600">{errors.konu.message}</p>}
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="mesaj" className="block mb-2 text-sm font-medium text-gray-700">Mesajınız *</label>
                          <textarea
                            id="mesaj"
                            rows={6}
                            className={`w-full px-3 py-2 border ${errors.mesaj ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-[#f29b24] focus:border-[#f29b24]`}
                            placeholder="Görüş ve önerilerinizi buraya yazabilirsiniz..."
                            {...register('mesaj', { required: 'Mesaj alanı zorunludur' })}
                          ></textarea>
                          {errors.mesaj && <p className="mt-1 text-sm text-red-600">{errors.mesaj.message}</p>}
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="puan" className="block mb-2 text-sm font-medium text-gray-700">Genel Memnuniyet (1-5)</label>
                          <select
                            id="puan"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#f29b24] focus:border-[#f29b24]"
                            {...register('puan')}
                          >
                            <option value="">Puan Veriniz</option>
                            <option value="5">5 - Çok Memnun</option>
                            <option value="4">4 - Memnun</option>
                            <option value="3">3 - Orta</option>
                            <option value="2">2 - Memnun Değil</option>
                            <option value="1">1 - Hiç Memnun Değil</option>
                          </select>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                type="checkbox"
                                id="kvkk"
                                className={`h-4 w-4 text-[#14543c] border ${errors.kvkk ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-[#f29b24]`}
                                {...register('kvkk', { required: 'KVKK aydınlatma metnini kabul etmelisiniz' })}
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="kvkk" className={`font-medium ${errors.kvkk ? 'text-red-700' : 'text-gray-700'}`}>
                                <Link href="/kisisel-verilerin-korunmasi" target="_blank" className="text-[#14543c] underline">KVKK Aydınlatma Metni</Link>&apos;ni okudum ve kabul ediyorum.
                              </label>
                              {errors.kvkk && <p className="mt-1 text-sm text-red-600">{errors.kvkk.message}</p>}
                            </div>
                          </div>
                        </div>
                        
                        {/* <div className="mb-4">
                          <ReCAPTCHA
                            sitekey="6LdnK4IaAAAAAF8dCYxS9oMNMEq5jjHxZOB--4-k"
                            onChange={handleCaptchaChange}
                          />
                          {submitError && submitError.includes('robot') && (
                            <p className="mt-1 text-sm text-red-600">Robot olmadığınızı doğrulayın</p>
                          )}
                        </div> */}
                        
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#14543c] text-white py-2 px-4 rounded-md hover:bg-[#0d3c2a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14543c] transition-colors"
                        >
                          {isSubmitting ? 'Gönderiliyor...' : 'GÖNDER'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
