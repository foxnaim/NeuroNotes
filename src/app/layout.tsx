import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neuronotes.app"),
  applicationName: "NeuroNotes",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  title: {
    default: "NeuroNotes — Заметки и задачи с ИИ",
    template: "%s | NeuroNotes",
  },
  description:
    "NeuroNotes — умные заметки и задачи с ИИ: резюмирование, предложения, организация и продуктивность.",
  keywords: [
    "NeuroNotes",
    "заметки",
    "задачи",
    "ИИ",
    "резюмирование",
    "продуктивность",
  ],
  authors: [{ name: "NeuroNotes Team" }],
  creator: "NeuroNotes",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://neuronotes.app/",
    siteName: "NeuroNotes",
    title: "NeuroNotes — Заметки и задачи с ИИ",
    description:
      "Организуйте мысли, создавайте задачи и повышайте продуктивность с ИИ-помощником.",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    site: "@neuronotes",
    title: "NeuroNotes — Заметки и задачи с ИИ",
    description:
      "Организуйте мысли, создавайте задачи и повышайте продуктивность с ИИ-помощником.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "productivity",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-background text-text-primary`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
