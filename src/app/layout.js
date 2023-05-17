import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Suspense } from 'react';

export const metadata = {
  title: 'LightLink NFT Gallery',
  description: 'LightLink NFT Gallery',
}

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
