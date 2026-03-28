"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, SquareStack, Send, Check, Ruler, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CONTACT_ENDPOINT } from "@/lib/site"

const availableSpaces = [
  { id: 1, floor: "Этаж 1", size: "25 м²", price: "от 35 000 ₽/мес", type: "Торговое" },
  { id: 2, floor: "Этаж 2", size: "40 м²", price: "от 50 000 ₽/мес", type: "Торговое" },
  { id: 3, floor: "Этаж 2", size: "15 м²", price: "от 22 000 ₽/мес", type: "Офисное" },
  { id: 4, floor: "Этаж -1", size: "60 м²", price: "от 70 000 ₽/мес", type: "Складское" },
]

export function Lease() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setIsSubmitting(true)

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8",
        },
        body: JSON.stringify({
          ...formData,
          area: formData.area || "",
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.type !== "opaque" && !response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      setIsSubmitted(true)
      setFormData({ name: "", phone: "", area: "" })
      window.setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    } catch (error) {
      console.error("Ошибка при отправке заявки:", error)
      setSubmitError("Не удалось отправить заявку. Попробуйте еще раз или позвоните нам.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="lease" className="relative bg-muted py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Аренда <span className="text-primary">недвижимости</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Коммерческие помещения для вашего бизнеса в проходном месте
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
              <SquareStack className="h-5 w-5 text-primary" />
              Свободные помещения
            </h3>
            <div className="space-y-4">
              {availableSpaces.map((space, index) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{space.floor}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Ruler className="h-3.5 w-3.5" />
                          <span>{space.size}</span>
                          <span className="text-border">•</span>
                          <Tag className="h-3.5 w-3.5" />
                          <span>{space.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{space.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mt-6 rounded-xl border-2 border-dashed border-border bg-card/50 p-6"
            >
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span className="text-xs uppercase tracking-wider">Рекламный блок</span>
              </div>
              <div className="mt-2 flex h-24 items-center justify-center rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Место для Яндекс Рекламы</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-xl md:p-8"
          >
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
              <Send className="h-5 w-5 text-primary" />
              Оставить заявку
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-foreground">Заявка отправлена!</h4>
                <p className="mt-2 text-muted-foreground">
                  Мы свяжемся с вами в ближайшее время
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    placeholder="Введите ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Желаемая площадь (м²)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="Например: 50"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Отправляем..." : "Отправить заявку"}
                </Button>
                {submitError ? (
                  <p
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {submitError}
                  </p>
                ) : null}
                <p className="text-center text-xs text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
