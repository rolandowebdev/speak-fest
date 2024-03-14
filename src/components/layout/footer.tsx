import { Copyright } from 'lucide-react'
import { ExternalLink } from '@/components/ui'

export const Footer = () => (
  <footer className="flex w-full items-center justify-between border-t pt-4 text-sm">
    <ExternalLink href="/source" className="no-underline hover:underline">
      /source
    </ExternalLink>
    <div className="flex items-center space-x-1">
      <Copyright size={12} />
      <span>{new Date().getFullYear()} by SpeakFest</span>
    </div>
  </footer>
)
