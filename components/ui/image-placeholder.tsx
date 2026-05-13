import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImagePlaceholderProps {
  className?: string
  aspectRatio?: "square" | "video" | "wide" | "portrait"
  label?: string
}

export function ImagePlaceholder({
  className,
  aspectRatio = "video",
  label = "Foto a ser adicionada",
}: ImagePlaceholderProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    portrait: "aspect-[3/4]",
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-muted border-2 border-dashed border-border rounded-lg",
        aspectClasses[aspectRatio],
        className
      )}
    >
      <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
      <span className="mt-2 text-sm text-muted-foreground">{label}</span>
    </div>
  )
}
