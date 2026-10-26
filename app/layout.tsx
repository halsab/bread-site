import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";

const staticAssetBase = process.env.BREAD_DEPLOY_TARGET === "github-pages" ? "/bread-site" : "";

export const metadata: Metadata = {
  title: "MoolYort Bakery — тартин и домашний хлеб на закваске",
  description:
    "MoolYort Bakery — домашний хлеб на закваске: классический тартин, тартин с семенами льна, тыквенный хлеб и ржаной хлеб. История пекаря и его хлеба.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "MoolYort Bakery — хлеб, которым хочется делиться",
    description:
      "Четыре вида домашнего хлеба: классический тартин, тартин с семенами льна, тыквенный хлеб и ржаной хлеб на закваске.",
  },
  icons: {
    icon: `${staticAssetBase}/favicon.svg`,
    shortcut: `${staticAssetBase}/favicon.svg`,
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
          href={`${staticAssetBase}/fonts/cormorant-garamond-cyrillic-500.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${staticAssetBase}/fonts/cormorant-garamond-latin-500.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
