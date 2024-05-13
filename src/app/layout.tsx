import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from './providers'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Convite Aurora",
  description: "Venha para o meu sexto aniversário",
  icons: [
    {
      url: "https://www.canva.com/design/DAGCtosflbE/-YKb_MNFzru4B5MabWWjcA/view",
      sizes: "512x512",
      type: "image/jpeg"
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='pt-br'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
