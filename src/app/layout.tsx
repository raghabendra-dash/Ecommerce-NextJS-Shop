import type { Metadata } from "next";
import {
  Lexend,
  Poppins,
  Pacifico,
  Bebas_Neue,
  Oswald,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/components/ReduxProvider";

const fontBody = Lexend({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-headline",
});

const fontLogo = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-logo",
});

const fontNav = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-nav",
});

const fontCategory = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-category",
});

const fontViewAll = Oswald({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-view-all",
});

export const metadata: Metadata = {
  title: "ShopCart - Your Perfect Style",
  description: "A modern e-commerce platform to discover your perfect style.",
  icons: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontBody.variable,
          fontHeadline.variable,
          fontLogo.variable,
          fontNav.variable,
          fontCategory.variable,
          fontViewAll.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ReduxProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
