import type { Metadata } from "next";
import { Montserrat  } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat ({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Better Stack Clone",
  description: "Pixel perfect clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}