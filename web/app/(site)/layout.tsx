import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { ThemeProvider } from "@/components/replica/theme/ThemeProvider";
import { MotionProvider } from "@/components/replica/motion/MotionProvider";
import { THEME_INIT_SCRIPT } from "@/lib/theme-init-script";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Autonomous Operations Factory | StackGen",
  description:
    "Take control of production. Give on-call complete context to see, decide, and change what is running. Aiden for InfraOps, DevOps, Observability, and SRE.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <body>
        <Script id="stackgen-theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
