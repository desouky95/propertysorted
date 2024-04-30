import { Metadata } from "next";
import { Roboto } from "next/font/google";
import Providers from "./providers";
import { Header } from "@/components/ui/layout/header/Header";
import Head from "next/head";

const roboto = Roboto({ weight: ["400", "700", "900"], subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={roboto.className}>
        <Providers>
          <Header />
          {children}
          <footer>Footer</footer>
        </Providers>
      </body>
    </html>
  );
}
