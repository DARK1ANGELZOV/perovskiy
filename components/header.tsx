"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Этажи", href: "#floors" },
  { label: "О нас", href: "#about" },
  { label: "Аренда", href: "#lease" },
  { label: "Контакты", href: "#contacts" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/80 backdrop-blur-xl shadow-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">П</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-semibold text-foreground">ТСК</span>
                <span className="ml-1 text-lg font-semibold text-primary">Перовский</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA & Phone */}
            <div className="hidden items-center gap-4 md:flex">
              <a
                href="tel:+73471234567"
                className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                <span>+7 (347) 123-45-67</span>
              </a>
              <Button asChild>
                <a href="#lease">Стать арендатором</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-card p-6 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-semibold text-foreground">Меню</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-foreground py-2 border-b border-border transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 space-y-4">
                <a
                  href="tel:+73471234567"
                  className="flex items-center gap-2 text-foreground"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+7 (347) 123-45-67</span>
                </a>
                <Button className="w-full" asChild>
                  <a href="#lease" onClick={() => setIsMobileMenuOpen(false)}>
                    Стать арендатором
                  </a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
