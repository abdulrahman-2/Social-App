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
  title: "Nestly",
  description: "Social media platform for developers",
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
          <div className="container max-w-screen-lg">
            <Header />
            {children}
            <Notifications />
          </div>
        </Providers>
      </body>
    </html>
  );
}
