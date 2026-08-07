import Image from "next/image"

export function WhatsAppButton() {
  return (
    <>
      {/* Desktop Version */}
      <a
        href="https://api.whatsapp.com/send?phone=5511947724725&text=Ol%C3%A1,%20vim%20do%20site%20e%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas..."
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex fixed bottom-8 right-8 z-40 items-center gap-3 bg-[#0dc152] text-white px-6 py-4 rounded-full shadow-lg hover:bg-[#0ba84a] transition-colors"
      >
        <Image
          src="/images/whatsapp-icon.png"
          alt="WhatsApp"
          width={24}
          height={24}
          className="w-6 h-6"
        />
        <span className="text-lg font-semibold whitespace-nowrap">Alguma Dúvida? Envie um WhatsApp</span>
      </a>

      {/* Mobile Version */}
      <a
        href="https://api.whatsapp.com/send?phone=5511947724725&text=Ol%C3%A1,%20vim%20do%20site%20e%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas..."
        target="_blank"
        rel="noopener noreferrer"
        className="md:hidden fixed bottom-6 inset-x-0 mx-auto z-40 w-[calc(100%-2rem)] max-w-sm flex items-center justify-center gap-2 bg-[#0dc152] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#0ba84a] transition-colors"
      >
        <Image
          src="/images/whatsapp-icon.png"
          alt="WhatsApp"
          width={20}
          height={20}
          className="w-5 h-5 shrink-0"
        />
        <span className="text-sm font-semibold text-center">Alguma Dúvida? Envie um WhatsApp</span>
      </a>
    </>
  )
}
