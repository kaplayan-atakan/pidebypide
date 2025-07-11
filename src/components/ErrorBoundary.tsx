"use client";
// Türkçe hata yakalayıcı: Beklenmedik bir hata oluşursa sayfayı otomatik yeniler
import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//     // Hata loglama yapılabilir
//     // console.error(error, errorInfo);
//   }

  componentDidUpdate() {
    if (this.state.hasError) {
      // Hata oluştuysa sayfayı otomatik yenile
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      // Kısa bir loading gösterebiliriz
      return <div>Sayfa yenileniyor...</div>;
    }
    return this.props.children;
  }
}
