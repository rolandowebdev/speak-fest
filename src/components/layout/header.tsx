import { ReactNode } from 'react'

type HeaderProps = {
  children: ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  return <header className="space-y-4 border-b pb-4">{children}</header>
}
