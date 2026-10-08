import { waLink } from '../data/company.js'

export default function WhatsAppFloat() {
  return (
    <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="group fixed bottom-6 right-5 z-40 flex items-center gap-3 md:right-8">
      <span className="hidden rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-navy opacity-0 shadow-lg transition-all duration-500 group-hover:opacity-100 md:block">Order on WhatsApp</span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-500 group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <svg className="relative" width="28" height="28" viewBox="0 0 32 32" fill="currentColor"><path d="M16.04 3C9.4 3 4 8.4 4 15.04c0 2.12.55 4.18 1.6 6L4 28l7.1-1.86a12 12 0 0 0 4.94 1.06C22.68 27.2 28 21.8 28 15.16 28 8.5 22.68 3 16.04 3Zm0 21.9c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-4.2 1.1 1.12-4.1-.2-.32a9.9 9.9 0 0 1-1.52-5.2c0-5.5 4.5-9.96 10.02-9.96 5.5 0 9.96 4.46 9.96 9.96 0 5.5-4.46 9.86-9.96 9.86Zm5.46-7.4c-.3-.15-1.77-.88-2.04-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.64-.93-2.25-.25-.58-.5-.5-.68-.5h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.23 5.13 4.53.72.3 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" /></svg>
      </span>
    </a>
  )
}
