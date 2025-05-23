import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { CustomThemeProvider } from "@/providers/custom-theme-provider";

const josefintSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${josefintSans.variable} antialiased`}>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </body>
    </html>
  );
}
