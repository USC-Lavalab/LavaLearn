import "~/lib/vendor/fonts/fonts.css";
import { Footer } from "./footer";
import "./globals.css";
import { Navbar } from "./navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans bg-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
