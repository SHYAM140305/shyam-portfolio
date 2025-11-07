import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Shyam J | AI/ML Engineer & Full Stack Developer",
  description:
    "Results-driven AI/ML Engineer with expertise in developing end-to-end machine learning systems, generative AI applications, and full-stack solutions.",
  keywords: [
    "AI/ML Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "Deep Learning",
    "Next.js",
    "React",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Shyam J" }],
  creator: "Shyam J",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://shyamj.vercel.app"),
  alternates: {
    canonical: "https://shyamj.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shyamj.vercel.app",
    title: "Shyam J | AI/ML Engineer & Full Stack Developer",
    description:
      "Results-driven AI/ML Engineer with expertise in developing end-to-end machine learning systems, generative AI applications, and full-stack solutions.",
    siteName: "Shyam J Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shyam J | AI/ML Engineer & Full Stack Developer",
    description:
      "Results-driven AI/ML Engineer with expertise in developing end-to-end machine learning systems, generative AI applications, and full-stack solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "dns-prefetch": "https://opengraph.githubassets.com https://github.com https://images.weserv.nl https://cdn.simpleicons.org https://logo.clearbit.com",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

