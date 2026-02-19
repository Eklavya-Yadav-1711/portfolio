import type { Metadata, Viewport } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import FontLoader from "@/components/FontLoader";

const tagline =
  "I write code by night. I chase the cosmos by dream. Somewhere in between — I build things that matter.";

export const metadata: Metadata = {
  title: "EKLAVYA — Full Stack Developer",
  description: tagline,
  openGraph: {
    title: "EKLAVYA — Full Stack Developer",
    description: tagline,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen antialiased overflow-x-hidden">
        <FontLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
