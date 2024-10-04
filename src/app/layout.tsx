import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppHeader from "@/components/app.header";
import "bootstrap/dist/css/bootstrap.min.css";
import AppFooter from "@/components/app.footer";
import { Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-light text-2`}
      >
        <AppHeader />
        <Container>{children}</Container>
        <AppFooter />
      </body>
    </html>
  );
}
