import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// The font variable sits on <html>: the Reader shell tokens live on :root and read it from there.
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const description = "A scoped educational reference for comparing campaign patterns and strategic constraints.";

export const metadata: Metadata = {
  metadataBase: new URL("https://military.bookchaowalit.com"),
  title: "Military Strategy Database — Study records",
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Military Strategy Database", title: "Military Strategy Database — Study records", description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
