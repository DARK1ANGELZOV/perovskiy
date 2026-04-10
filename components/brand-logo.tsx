"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { withBasePath } from "@/lib/site"

const LOGO_WIDTH = 436
const LOGO_HEIGHT = 102

const logoSizeClasses = {
  header: "w-[8.5rem] sm:w-[9.5rem] md:w-[10rem] lg:w-[11rem] xl:w-[12rem]",
  footer: "w-[7.25rem] sm:w-[8rem]",
} as const

type BrandLogoSize = keyof typeof logoSizeClasses

interface BrandLogoProps {
  size?: BrandLogoSize
  className?: string
  priority?: boolean
}

function BrandLogoFallback({ size, className }: { size: BrandLogoSize; className?: string }) {
  const badgeClass = size === "footer" ? "h-7 w-7 text-sm" : "h-8 w-8 text-base"
  const textClass = size === "footer" ? "text-sm" : "text-base sm:text-lg"

  return (
    <span className={cn("inline-flex items-center gap-2 whitespace-nowrap", className)}>
      <span className={cn("inline-flex items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground", badgeClass)}>
        П
      </span>
      <span className={cn("font-semibold text-foreground", textClass)}>
        ТСК <span className="text-primary">Перовский</span>
      </span>
    </span>
  )
}

export function BrandLogo({ size = "header", className, priority = false }: BrandLogoProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return <BrandLogoFallback size={size} className={className} />
  }

  return (
    <img
      src={withBasePath("/images/logo-perovskiy.png")}
      alt="Логотип ТСК Перовский"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={cn("h-auto shrink-0 object-contain", logoSizeClasses[size], className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setHasError(true)}
    />
  )
}
