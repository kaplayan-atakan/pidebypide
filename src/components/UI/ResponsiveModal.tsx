'use client';

import { useEffect } from 'react';
import { useResponsive } from '@/hooks/useResponsive';

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function ResponsiveModal({
  isOpen,
  onClose,
  children,
  title,
  className = ''
}: ResponsiveModalProps) {
  const { isMobile, isTablet } = useResponsive();

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Body scroll'u engelle
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Mobil ve tablet için farklı stilizasyon
  const modalClasses = `
    fixed inset-0 z-50 flex items-center justify-center
    ${isMobile ? 'p-2' : isTablet ? 'p-4' : 'p-8'}
  `;

  const contentClasses = `
    bg-white rounded-lg shadow-2xl max-h-[90vh] overflow-auto
    ${isMobile 
      ? 'w-full h-full rounded-none' // Mobilde tam ekran
      : isTablet 
        ? 'w-full max-w-lg' // Tablette orta boy
        : 'w-full max-w-2xl' // Desktop'ta büyük
    }
    ${className}
  `;

  return (
    <div className={modalClasses}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative ${contentClasses}`}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between spacing-md border-b border-gray-200">
            <h2 className="text-responsive-lg font-bold font-header text-[#14543c]">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="btn-touch text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Modalı kapat"
            >
              ×
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className={title ? 'spacing-md' : 'spacing-md'}>
          {children}
        </div>
        
        {/* Close button for mobile if no title */}
        {!title && isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 btn-touch text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Modalı kapat"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
