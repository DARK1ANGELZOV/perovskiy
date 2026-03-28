"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { withBasePath } from "@/lib/site"
import { cn } from "@/lib/utils"

const FLOOR_PLANS = [
  {
    id: "-1",
    buttonLabel: "-1 этаж",
    imageSrc: withBasePath("/images/floor1.jpg"),
    imageAlt: "План -1 этажа ТСК Перовский",
  },
  {
    id: "1",
    buttonLabel: "1 этаж",
    imageSrc: withBasePath("/images/floor2.jpg"),
    imageAlt: "План 1 этажа ТСК Перовский",
  },
  {
    id: "2",
    buttonLabel: "2 этаж",
    imageSrc: withBasePath("/images/floor3.jpg"),
    imageAlt: "План 2 этажа ТСК Перовский",
  },
] as const

type FloorId = (typeof FLOOR_PLANS)[number]["id"]

const DEFAULT_FALLBACKS: Record<FloorId, boolean> = {
  "-1": false,
  "1": false,
  "2": false,
}

export function FloorNavigator() {
  const [activeFloor, setActiveFloor] = useState<FloorId>("-1")
  const [failedImages, setFailedImages] = useState<Record<FloorId, boolean>>(DEFAULT_FALLBACKS)

  const activePlan = FLOOR_PLANS.find((plan) => plan.id === activeFloor) ?? FLOOR_PLANS[0]

  return (
    <section id="floors" className="bg-[#F5F5F5] py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="sr-only">Планы этажей</h2>

          <div className="flex flex-wrap gap-3">
            {FLOOR_PLANS.map((plan) => {
              const isActive = plan.id === activeFloor

              return (
                <Button
                  key={plan.id}
                  type="button"
                  size="lg"
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setActiveFloor(plan.id)}
                  className={cn(
                    "min-w-[112px] rounded-xl px-5 shadow-sm transition-all",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-black/10"
                      : "border-border bg-white text-muted-foreground hover:bg-white hover:text-foreground",
                  )}
                  aria-pressed={isActive}
                >
                  {plan.buttonLabel}
                </Button>
              )
            })}
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-border bg-white p-2 shadow-xl md:mt-8 md:p-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activePlan.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="overflow-hidden rounded-[22px]"
              >
                {failedImages[activePlan.id] ? (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-[22px] bg-gradient-to-br from-stone-100 via-white to-stone-200">
                    <div className="rounded-2xl border border-border bg-white/90 px-6 py-4 text-center shadow-sm backdrop-blur">
                      <p className="text-lg font-semibold text-foreground">{activePlan.buttonLabel}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{activePlan.imageSrc}</p>
                    </div>
                  </div>
                ) : (
                  <img
                    src={activePlan.imageSrc}
                    alt={activePlan.imageAlt}
                    className="block h-auto w-full rounded-[22px] bg-white"
                    draggable={false}
                    onError={() =>
                      setFailedImages((current) => ({
                        ...current,
                        [activePlan.id]: true,
                      }))
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
