import RootLayout from "@/components/layouts/root-layout/RootLayout";
import "./globals.css";
import { Metadata, Viewport } from "next";


export const viewport: Viewport = {
  themeColor: 'black',
  initialScale : 1,
  maximumScale : 1,
  width : 'device-width'
}

export const metadata: Metadata = {
  title: "Property Sorted",
  description: "Unlock Your Dream Home: Your Perfect Match Awaits!",
  applicationName : 'Property Sorted',
  
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout>{children}</RootLayout>;
}
