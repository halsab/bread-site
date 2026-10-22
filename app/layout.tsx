import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bread — домашний тартин и хлеб ручной работы",
  description:
    "Bread — домашний хлеб на закваске. Классический тартин, тартин с семенами льна и тыквенный хлеб с семечками. История пекаря и его хлеба.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Bread — хлеб, которым хочется делиться",
    description:
      "Домашний тартин и хлеб на закваске. Простые ингредиенты, внимание к процессу и любовь к хорошему хлебу.",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
