import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammed Aseem | Digital Transformation & AI",
  description:
    "Mohammed Aseem is a 3rd-year Digital Transformation & AI student at Atria University. Explore his verified projects and ask his AI Digital Twin anything.",
  openGraph: {
    title: "Mohammed Aseem | Digital Transformation & AI",
    description: "An AI-powered portfolio with an interactive Digital Twin.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- this is the App Router root layout, the correct place for a global font link, not a per-page pages/_document.js */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-slate-950 font-sans text-slate-100">{children}</body>
    </html>
  );
}
