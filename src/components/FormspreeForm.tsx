'use client';

import React, { useState } from 'react';

interface FormspreeFormProps {
  formId: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Formspree ile çalışan form bileşeni
 * GitHub Pages gibi statik ortamlarda API rotası olmadan çalışır
 * 
 * Kullanım örneği:
 * ```jsx
 * <FormspreeForm formId="xxxxxxxxxxxx">
 *   <input name="name" placeholder="Adınız" />
 *   <input name="email" placeholder="E-posta" />
 *   <button type="submit">Gönder</button>
 * </FormspreeForm>
 * ```
 */
export default function FormspreeForm({
  formId,
  successMessage = "Form başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
  errorMessage = "Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
  className = "",
  children
}: FormspreeFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setMessage(successMessage);
        form.reset();
      } else {
        const data = await response.json();
        if (data && data.errors) {
          setStatus('error');
          setMessage(data.errors.map((error: { message: string }) => error.message).join(', '));
        } else {
          setStatus('error');
          setMessage(errorMessage);
        }
      }
    } catch (error) {
      setStatus('error');
      setMessage(errorMessage);
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        {children}

        {status === 'submitting' && (
          <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded">
            Gönderiliyor... Lütfen bekleyin.
          </div>
        )}
        
        {status === 'success' && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded">
            {message}
          </div>
        )}
        
        {status === 'error' && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
