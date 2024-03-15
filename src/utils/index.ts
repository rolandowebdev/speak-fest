import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function postedAt(date: string) {
  const now = new Date().getTime()
  const posted = new Date(date).getTime()
  const diff = now - posted
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor(diff / (1000 * 60 * 60))
  const diffMinutes = Math.floor(diff / (1000 * 60))
  const diffSeconds = Math.floor(diff / 1000)

  if (diffDays > 0) {
    return `${diffDays} days ago`
  }
  if (diffHours > 0) {
    return `${diffHours} hours ago`
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} minutes ago`
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} seconds ago`
  }
  return 'just now'
}

function convertToUppercase(text: string) {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export { cn, postedAt, convertToUppercase }
