import * as React from 'react'
import { Button, Heading } from '@/components/ui'
import { Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout'

type HeaderWithLinkProps = {
  icon: React.ReactNode
  title: string
}

export function HeaderWithLink({ icon, title }: HeaderWithLinkProps) {
  const { push } = useRouter()

  return (
    <Header>
      <Button
        data-testid="back-to-home"
        variant="link"
        className="flex items-center gap-1 px-0 text-lg text-primary"
        onClick={() => push('/')}>
        <Undo2 size={18} />
        Back to home
      </Button>
      <Heading className="flex flex-wrap items-center gap-2">
        {icon} {title}
      </Heading>
    </Header>
  )
}
