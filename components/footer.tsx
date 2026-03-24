"use client"

import { motion } from "framer-motion"

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
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">П</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              ТСК <span className="text-primary">Перовский</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#floors" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Этажи
            </a>
            <a href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              О нас
            </a>
            <a href="#lease" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Аренда
            </a>
            <a href="#contacts" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
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
