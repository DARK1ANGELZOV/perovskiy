"use client"

import { motion } from "framer-motion"
import { Building2, ShieldCheck, Coffee, Navigation, Users, Calendar, Clock, Car } from "lucide-react"

const bentoItems = [
  {
    icon: Building2,
    title: "Администрация ТСК",
    description: "Заботимся о вашем комфорте и решаем вопросы каждый день",
    className: "md:col-span-1",
  },
  {
    icon: ShieldCheck,
    title: "Охрана 24/7",
    description: "Видеонаблюдение и профессиональная служба безопасности",
    className: "md:col-span-1",
  },
  {
    icon: Coffee,
    title: "Зоны отдыха",
    description: "Комфортные места для отдыха с кафе и автоматами",
    className: "md:col-span-1",
  },
  {
    icon: Navigation,
    title: "Навигация",
    description: "Информационные стенды и указатели на каждом этаже",
    className: "md:col-span-1",
  },
  {
    icon: Car,
    title: "Парковка",
    description: "Просторная парковка рядом со зданием, бесплатно для посетителей",
    className: "md:col-span-2",
  },
]

const stats = [
  {
    value: "5000+",
    label: "посетителей ежедневно",
    icon: Users,
  },
  {
    value: "11",
    label: "лет на рынке",
    icon: Calendar,
  },
  {
    value: "12",
    label: "часов работы",
    icon: Clock,
  },
]

export function About() {
  return (
    <section id="about" className="relative bg-background py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            О <span className="text-primary">комплексе</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Современная инфраструктура для комфортных покупок
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/50 hover:shadow-xl"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
              <div className="relative">
                <stat.icon className="mx-auto mb-4 h-8 w-8 text-primary" />
                <div className="text-4xl font-bold text-foreground md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg ${item.className}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
