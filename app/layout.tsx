import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { withBasePath } from '@/lib/site'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'ТСК Перовский — Торговый центр',
  description: 'ТСК Перовский в Уфе — торгово-сервисный комплекс на ул. Софьи Перовской, 17/1. Более 25 магазинов, удобная парковка, аренда коммерческих площадей.',
  icons: {
    icon: [
      {
        url: withBasePath('/icon.svg'),
        type: 'image/svg+xml',
      },
    ],
    apple: withBasePath('/apple-icon.png'),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
