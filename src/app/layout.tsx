import './globals.css'
import { Inter } from 'lucide-react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}
