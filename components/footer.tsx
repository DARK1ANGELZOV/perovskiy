"use client"

import { motion } from "framer-motion"
import { BrandLogo } from "@/components/brand-logo"

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border bg-card py-8"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo */}
          <a href="#" aria-label="ТСК Перовский" className="flex items-center">
            <BrandLogo size="footer" />
          </a>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#floors" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Этажи
            </a>
            <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              О нас
            </a>
            <a href="#lease" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Аренда
            </a>
            <a href="#contacts" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Контакты
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} ТСК Перовский
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
