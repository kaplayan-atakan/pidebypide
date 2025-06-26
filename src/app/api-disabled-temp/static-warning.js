// Bu dosya GitHub Pages gibi statik sunucular için uyarı gösterir
// Statik dışa aktarımda API rotaları çalışmaz

export async function GET() {
  return new Response(JSON.stringify({
    error: true,
    message: "API rotaları statik sunucularda desteklenmez. Formu göndermek için Formspree veya benzer bir hizmet kullanmanız gerekir."
  }), {
    status: 404,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function POST() {
  return new Response(JSON.stringify({
    error: true,
    message: "API rotaları statik sunucularda desteklenmez. Formu göndermek için Formspree veya benzer bir hizmet kullanmanız gerekir."
  }), {
    status: 404,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
