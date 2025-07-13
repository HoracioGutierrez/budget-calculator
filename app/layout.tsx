import type { Metadata } from 'next'
import { LayoutHeader, ThemeProvider } from '@/features/layout/components'
import { RootLayoutProps } from '@/features/layout/types'
import './globals.css'

export const metadata: Metadata = {
  title: 'Budget Calculator App',
  description: 'A professional web development budget calculator that helps estimate project costs, timelines, and sprint planning. Features AI-powered analysis, customizable features, and detailed project breakdowns.',
  authors: [
    {
      name: 'Horacio Gutierrez',
      url: 'https://horagutierrez.vercel.app'
    }
  ]
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutHeader />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
