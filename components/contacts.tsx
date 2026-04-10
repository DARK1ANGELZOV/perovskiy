"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, Phone, Bus, Car } from "lucide-react"

const transportRoutes = [
  { icon: Bus, label: "Остановка:", value: "Улица Степана Кувыкина" },
  { icon: Bus, label: "Автобусы", value: "31, 110С, 234, 224" },
  { icon: Car, label: "На авто", value: "Бесплатная парковка" },
]

const contacts = [
  { icon: MapPin, label: "Адрес", value: "г. Уфа, ул. Софьи Перовской, 17/1" },
  { icon: Clock, label: "Режим работы", value: "Ежедневно с 09:00 до 21:00" },
  { icon: Phone, label: "Телефон N", value: "+7 (347) 256-48-63", href: "tel:+73472564863"},
  { icon: Phone, label: "Телефон N", value: "+7 (937) 839-99-72", href: "tel:+79378399972"},
]

export function Contacts() {
  return (
    <section id="contacts" className="relative bg-background">
      {/* Map Container */}
      <div className="relative h-[600px] md:h-[700px]">
        {/* Real Yandex Maps iframe */}
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A159c71d05c31fa73ca368d38024103e0ba6a89bd1ad19432074b3466f0554448&amp;source=constructo"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          className="absolute inset-0"
          title="Карта ТСК Перовский"
          style={{ filter: 'saturate(1.1)' }}
        />

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="absolute left-4 top-4 bottom-4 z-10 flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl md:left-8 md:top-8 md:bottom-8"
        >
          {/* Header */}
          <div className="border-b border-border bg-primary p-6">
            <h2 className="text-2xl font-bold text-primary-foreground">ТСК Перовский</h2>
            <p className="mt-1 text-primary-foreground/80">Торгово-сервисный комплекс</p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {/* Contacts */}
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <contact.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{contact.label}</p>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{contact.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-border" />

            {/* Transport */}
            <h3 className="mb-4 font-semibold text-foreground">Как добраться</h3>
            <div className="space-y-3">
              {transportRoutes.map((route) => (
                <div key={route.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <route.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{route.label}</p>
                    <p className="text-xs text-muted-foreground">{route.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <a
              href="https://yandex.ru/map-widget/v1/?um=constructor%3A159c71d05c31fa73ca368d38024103e0ba6a89bd1ad19432074b3466f0554448&amp;source=constructo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MapPin className="h-4 w-4" />
              Построить маршрут
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
