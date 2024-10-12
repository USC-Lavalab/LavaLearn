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
      <head>
        <title>LavaLearn</title>
      </head>
      <body className={`bg-white font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
