export default function KariyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* reCAPTCHA Script */}
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    </>
  );
}
