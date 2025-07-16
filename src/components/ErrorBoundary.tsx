"use client";
// Türkçe hata yakalayıcı: Beklenmedik bir hata oluşursa sayfayı otomatik yeniler
import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

// React dışı (global) hataları yakalamak için handler fonksiyonu
function setupGlobalErrorHandlers() {
    if (typeof window !== 'undefined') {
        // window.onerror
        window.onerror = function (message, source, lineno, colno, error) {
            // removeChild hatası ise özel log, değilse genel log
            if (
                error instanceof TypeError &&
                typeof error.message === 'string' &&
                error.message.includes('removeChild')
            ) {
                console.error('HATAAA (global)', error);
                console.error("HATAAA 56A");
                window.location.reload();
            } else {
                console.error('Global JS Hatası:', message, source, lineno, colno, error);
            }
        };
        // window.onunhandledrejection
        window.onunhandledrejection = function (event) {
            console.error('Global Promise Hatası:', event.reason);
        };
    }
}

export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
        // Sadece bir kez global handler ekle
        if (typeof window !== 'undefined' && !(window as unknown as { __pbp_global_error_handler_set?: boolean }).__pbp_global_error_handler_set) {
            setupGlobalErrorHandlers();
            (window as unknown as { __pbp_global_error_handler_set?: boolean }).__pbp_global_error_handler_set = true;
        }
    }

    // Sonsuz reload döngüsünü engellemek için bir flag kullan
    private static reloadFlagKey = '__pbp_errorboundary_reloaded';

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        if (
            error instanceof TypeError &&
            typeof error.message === 'string' &&
            error.message.includes("removeChild")
        ) {
            // removeChild hatası yakalandı
            console.error("HATAAA 56A");
            window.location.reload();

            console.error("HATAAA", error);
            console.error("HATAAA 56A", window);

            // Sayfayı sadece bir kez refresh et
            if (typeof window !== 'undefined') {
                // const alreadyReloaded = window.sessionStorage.getItem(ErrorBoundary.reloadFlagKey);
                // if (!alreadyReloaded) {
                console.error("HATAAA 56A");

                window.sessionStorage.setItem(ErrorBoundary.reloadFlagKey, '1');
                window.location.reload();
                // }
            }
        }
        // Diğer hatalar için de loglama yapılabilir
        console.error(error, errorInfo);
    }

    componentDidUpdate() {
        if (this.state.hasError) {
            // Sadece bir kez reload dene, sonra fallback göster
            if (typeof window !== 'undefined') {
                const alreadyReloaded = window.sessionStorage.getItem(ErrorBoundary.reloadFlagKey);
                if (!alreadyReloaded) {
                    window.sessionStorage.setItem(ErrorBoundary.reloadFlagKey, '1');
                    window.location.reload();
                }
            }
        }
    }

    render() {
        if (this.state.hasError) {
            // Eğer reload sonrası da hata devam ediyorsa kullanıcıya açıklama ve buton göster
            const alreadyReloaded = typeof window !== 'undefined' && window.sessionStorage.getItem(ErrorBoundary.reloadFlagKey);
            if (alreadyReloaded) {
                return (
                    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-8">
                        <div className="text-2xl font-bold mb-4 text-[#14543c]">Beklenmedik bir hata oluştu</div>
                        <div className="mb-4 text-gray-700">Sayfa otomatik olarak yenilenemedi. Lütfen aşağıdaki butona tıklayarak tekrar deneyin.</div>
                        <button
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    window.sessionStorage.removeItem(ErrorBoundary.reloadFlagKey);
                                    window.location.reload();
                                }
                            }}
                            className="bg-[#14543c] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0f3d2a] transition-colors"
                        >
                            Sayfayı Yenile
                        </button>
                    </div>
                );
            }
            // İlk hata anında kısa bir loading gösterebiliriz
            return <div>Sayfa yenileniyor...</div>;
        }
        return this.props.children;
    }
}

