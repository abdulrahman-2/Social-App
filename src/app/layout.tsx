import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Providers } from "./providers";
import Notifications from "@/components/layout/Notifications";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-background ${poppins.className}`}>
        <Providers>
          <Header />
          <div className="container max-w-screen-lg">{children}</div>
          <Notifications />
        </Providers>
      </body>
    </html>
  );
}
