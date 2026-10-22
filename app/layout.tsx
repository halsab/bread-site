import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";

export const metadata: Metadata = {
  title: "Bread — тартин и домашний хлеб на закваске",
  description:
    "Bread — домашний хлеб на закваске: классический тартин, тартин с семенами льна, тыквенный хлеб и ржаной хлеб. История пекаря и его хлеба.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Bread — хлеб, которым хочется делиться",
    description:
      "Четыре вида домашнего хлеба: классический тартин, тартин с семенами льна, тыквенный хлеб и ржаной хлеб на закваске.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          href="/fonts/cormorant-garamond-cyrillic-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/cormorant-garamond-latin-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
