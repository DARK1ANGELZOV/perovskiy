"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, ZoomIn, ZoomOut, RotateCcw, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Store {
  id: string
  name: string
  category: string
  status: "occupied" | "available"
  area?: number
  rent?: string
  color: string
  // SVG polygon points (x,y pairs)
  points: string
  // Label position
  lx: number
  ly: number
  // Font size override
  fontSize?: number
}

interface FloorConfig {
  id: string
  name: string
  label: string
  stores: Store[]
}

// ============================================
// FLOOR -1: Fix Price + Ювелирный
// Based on screenshot: Large Fix Price, small corner jewelry store
// Building shape: Trapezoid with cut corner at top-left
// ============================================
const floorMinus1: FloorConfig = {
  id: "minus1",
  name: "Этаж -1",
  label: "-1",
  stores: [
    {
      id: "m1-fixprice",
      name: "Fix Price",
      category: "Магазин фиксированных цен",
      status: "occupied",
      area: 450,
      color: "#dbeafe", // light blue like on map
      // Large area - entire left portion of building
      points: "40,340 40,100 100,40 420,40 420,200 380,200 380,340",
      lx: 200,
      ly: 190,
      fontSize: 18,
    },
    {
      id: "m1-service",
      name: "Служебное",
      category: "Служебная зона",
      status: "occupied",
      area: 60,
      color: "#e5e7eb",
      // Right top section
      points: "425,40 540,40 580,80 580,200 425,200",
      lx: 490,
      ly: 120,
      fontSize: 11,
    },
    {
      id: "m1-plan",
      name: "План эвакуации",
      category: "Информация",
      status: "occupied",
      area: 25,
      color: "#f3f4f6",
      points: "530,205 580,205 580,280 530,280",
      lx: 555,
      ly: 245,
      fontSize: 8,
    },
    {
      id: "m1-avail",
      name: "Свободно",
      category: "Торговая площадь",
      status: "available",
      area: 40,
      rent: "от 800 ₽/м²",
      color: "#bbf7d0",
      points: "425,205 525,205 525,280 425,280",
      lx: 475,
      ly: 245,
      fontSize: 10,
    },
    {
      id: "m1-jewelry",
      name: "Ювелирный",
      category: "Ювелирные изделия",
      status: "occupied",
      area: 35,
      color: "#fecaca", // red/pink like on map
      // Bottom-right corner
      points: "500,340 500,285 580,285 580,360 520,380",
      lx: 535,
      ly: 330,
      fontSize: 10,
    },
  ],
}

// ============================================
// FLOOR 1: Food Market - Dense layout
// Based on screenshot: МТС, Здравсити, Молоко, Мясо, Хлеб, etc.
// ============================================
const floor1: FloorConfig = {
  id: "floor1",
  name: "Этаж 1",
  label: "1",
  stores: [
    // === TOP ROW (Right side - specialty foods) ===
    {
      id: "f1-konditerskaya",
      name: "Кондитерская",
      category: "Сладости",
      status: "occupied",
      area: 35,
      color: "#fed7aa",
      points: "340,40 420,40 420,90 340,90",
      lx: 380,
      ly: 68,
      fontSize: 9,
    },
    {
      id: "f1-hleb1",
      name: "Хлеб",
      category: "Пекарня",
      status: "occupied",
      area: 30,
      color: "#fed7aa",
      points: "425,40 490,40 490,90 425,90",
      lx: 455,
      ly: 68,
      fontSize: 10,
    },
    {
      id: "f1-korei",
      name: "Корейские продукты",
      category: "Продукты",
      status: "occupied",
      area: 40,
      color: "#bfdbfe",
      points: "495,40 575,40 575,90 495,90",
      lx: 530,
      ly: 68,
      fontSize: 8,
    },
    {
      id: "f1-kireevskmz",
      name: "Киреевский м.з.",
      category: "Молочный завод",
      status: "occupied",
      area: 50,
      color: "#bfdbfe",
      points: "580,40 640,80 640,130 580,130 580,90",
      lx: 605,
      ly: 100,
      fontSize: 8,
    },
    {
      id: "f1-ozon",
      name: "Ozon",
      category: "Пункт выдачи",
      status: "occupied",
      area: 30,
      color: "#bfdbfe",
      points: "590,135 640,135 640,190 590,190",
      lx: 615,
      ly: 165,
      fontSize: 10,
    },
    
    // === SECOND ROW ===
    {
      id: "f1-nashmyasnoi",
      name: "Наш Мясной Дворик",
      category: "Мясо",
      status: "occupied",
      area: 50,
      color: "#fecaca",
      points: "400,95 520,95 520,145 400,145",
      lx: 455,
      ly: 120,
      fontSize: 9,
    },
    {
      id: "f1-myaso1",
      name: "Мясо",
      category: "Мясные продукты",
      status: "occupied",
      area: 40,
      color: "#bfdbfe",
      points: "525,95 585,95 585,145 525,145",
      lx: 555,
      ly: 120,
      fontSize: 10,
    },
    {
      id: "f1-stoloto",
      name: "Столото",
      category: "Лотерея",
      status: "occupied",
      area: 20,
      color: "#fcd34d",
      points: "590,95 630,115 630,145 590,145",
      lx: 607,
      ly: 125,
      fontSize: 9,
    },
    
    // === THIRD ROW ===
    {
      id: "f1-ufadessert",
      name: "Ufa Dessert",
      category: "Кондитерская",
      status: "occupied",
      area: 30,
      color: "#fed7aa",
      points: "290,95 335,95 335,145 290,145",
      lx: 310,
      ly: 120,
      fontSize: 8,
    },
    {
      id: "f1-hleb2",
      name: "Хлеб",
      category: "Пекарня",
      status: "occupied",
      area: 25,
      color: "#fed7aa",
      points: "340,95 395,95 395,145 340,145",
      lx: 365,
      ly: 120,
      fontSize: 10,
    },
    {
      id: "f1-myaso2",
      name: "Мясо",
      category: "Мясные продукты",
      status: "occupied",
      area: 45,
      color: "#bfdbfe",
      points: "525,150 640,150 640,200 525,200",
      lx: 580,
      ly: 175,
      fontSize: 11,
    },
    
    // === FOURTH ROW (Middle) ===
    {
      id: "f1-moloko",
      name: "Молоко",
      category: "Молочные продукты",
      status: "occupied",
      area: 35,
      color: "#bfdbfe",
      points: "160,150 230,150 230,200 160,200",
      lx: 195,
      ly: 175,
      fontSize: 10,
    },
    {
      id: "f1-bakaleia",
      name: "Бакалея",
      category: "Продукты",
      status: "occupied",
      area: 45,
      color: "#fed7aa",
      points: "340,150 420,150 420,200 340,200",
      lx: 375,
      ly: 175,
      fontSize: 10,
    },
    
    // === FIFTH ROW ===
    {
      id: "f1-roshinsky",
      name: "Рощинский",
      category: "Продукты",
      status: "occupied",
      area: 40,
      color: "#ddd6fe",
      points: "200,205 285,205 285,255 200,255",
      lx: 240,
      ly: 230,
      fontSize: 9,
    },
    {
      id: "f1-pechenye",
      name: "Печенье",
      category: "Выпечка",
      status: "occupied",
      area: 30,
      color: "#fed7aa",
      points: "340,205 420,205 420,255 340,255",
      lx: 375,
      ly: 230,
      fontSize: 10,
    },
    {
      id: "f1-mrtobacco",
      name: "Mr. Tobacco",
      category: "Табачные изделия",
      status: "occupied",
      area: 25,
      color: "#fecaca",
      points: "290,205 335,205 335,255 290,255",
      lx: 310,
      ly: 230,
      fontSize: 8,
    },
    {
      id: "f1-alkomir",
      name: "АлкоМир",
      category: "Алкоголь",
      status: "occupied",
      area: 50,
      color: "#bfdbfe",
      points: "425,205 520,205 520,255 425,255",
      lx: 470,
      ly: 230,
      fontSize: 10,
    },
    {
      id: "f1-myaso3",
      name: "Мясо",
      category: "Мясные продукты",
      status: "occupied",
      area: 45,
      color: "#bfdbfe",
      points: "525,205 640,205 640,255 525,255",
      lx: 580,
      ly: 230,
      fontSize: 11,
    },
    
    // === SIXTH ROW ===
    {
      id: "f1-remont",
      name: "Ремонт обуви",
      category: "Услуги",
      status: "occupied",
      area: 15,
      color: "#fcd34d",
      points: "130,260 200,260 200,305 130,305",
      lx: 160,
      ly: 282,
      fontSize: 8,
    },
    {
      id: "f1-travy",
      name: "Травы Башкирии",
      category: "Продукты",
      status: "occupied",
      area: 25,
      color: "#ddd6fe",
      points: "205,260 285,260 285,305 205,305",
      lx: 242,
      ly: 282,
      fontSize: 8,
    },
    {
      id: "f1-frukty1",
      name: "Фрукты",
      category: "Фрукты и овощи",
      status: "occupied",
      area: 40,
      color: "#bbf7d0",
      points: "340,260 420,260 420,310 340,310",
      lx: 375,
      ly: 285,
      fontSize: 10,
    },
    {
      id: "f1-frukty2",
      name: "Фрукты",
      category: "Фрукты и овощи",
      status: "occupied",
      area: 35,
      color: "#bbf7d0",
      points: "425,260 505,260 505,310 425,310",
      lx: 462,
      ly: 285,
      fontSize: 10,
    },
    {
      id: "f1-ryba",
      name: "Рыба",
      category: "Рыбные продукты",
      status: "occupied",
      area: 45,
      color: "#bfdbfe",
      points: "560,260 640,260 640,320 560,320",
      lx: 598,
      ly: 290,
      fontSize: 11,
    },
    
    // === LEFT SIDE SERVICES ===
    {
      id: "f1-mtsbank",
      name: "МТС банк",
      category: "Банк",
      status: "occupied",
      area: 20,
      color: "#fecaca",
      points: "40,340 40,300 85,300 85,340",
      lx: 60,
      ly: 320,
      fontSize: 8,
    },
    {
      id: "f1-mts",
      name: "МТС",
      category: "Связь",
      status: "occupied",
      area: 25,
      color: "#fecaca",
      points: "40,295 40,260 85,260 85,295",
      lx: 60,
      ly: 278,
      fontSize: 10,
    },
    {
      id: "f1-megafon1",
      name: "МегаФон-Yota",
      category: "Связь",
      status: "occupied",
      area: 30,
      color: "#ddd6fe",
      points: "90,295 90,260 145,260 145,295",
      lx: 115,
      ly: 278,
      fontSize: 7,
    },
    {
      id: "f1-megafon2",
      name: "МегаФон-Yota",
      category: "Связь",
      status: "occupied",
      area: 30,
      color: "#ddd6fe",
      points: "90,340 90,300 145,300 145,340",
      lx: 115,
      ly: 320,
      fontSize: 7,
    },
    {
      id: "f1-zdravsiti",
      name: "Здравсити",
      category: "Аптека",
      status: "occupied",
      area: 40,
      color: "#bbf7d0",
      points: "150,340 150,300 230,300 230,340",
      lx: 185,
      ly: 320,
      fontSize: 9,
    },
    
    // === BOTTOM ROW ===
    {
      id: "f1-ochki",
      name: "Очки и оправы",
      category: "Оптика",
      status: "occupied",
      area: 30,
      color: "#ddd6fe",
      points: "290,310 380,310 380,360 290,360",
      lx: 330,
      ly: 335,
      fontSize: 9,
    },
    {
      id: "f1-bulgakovo",
      name: "Булгаково",
      category: "Продукты",
      status: "occupied",
      area: 45,
      color: "#e5e7eb",
      points: "440,315 540,315 540,365 440,365",
      lx: 485,
      ly: 340,
      fontSize: 9,
    },
    {
      id: "f1-kuritsa",
      name: "Курица&яйцо",
      category: "Птица",
      status: "occupied",
      area: 50,
      color: "#bfdbfe",
      points: "560,325 640,325 640,380 560,380",
      lx: 595,
      ly: 352,
      fontSize: 8,
    },
    {
      id: "f1-plan",
      name: "План эвакуации",
      category: "Информация",
      status: "occupied",
      area: 20,
      color: "#f3f4f6",
      points: "235,345 290,345 290,390 235,390",
      lx: 260,
      ly: 368,
      fontSize: 7,
    },
    {
      id: "f1-plushka",
      name: "Плюшка",
      category: "Выпечка",
      status: "occupied",
      area: 35,
      color: "#e5e7eb",
      points: "385,365 435,365 435,410 385,410",
      lx: 405,
      ly: 388,
      fontSize: 9,
    },
    {
      id: "f1-design",
      name: "Design",
      category: "Дизайн",
      status: "occupied",
      area: 25,
      color: "#e5e7eb",
      points: "470,370 550,370 580,410 470,410",
      lx: 515,
      ly: 390,
      fontSize: 10,
    },
    
    // Available
    {
      id: "f1-avail1",
      name: "Свободно",
      category: "Торговая площадь",
      status: "available",
      area: 50,
      rent: "от 1200 ₽/м²",
      color: "#bbf7d0",
      points: "510,260 555,260 555,320 510,320",
      lx: 530,
      ly: 290,
      fontSize: 8,
    },
  ],
}

// ============================================
// FLOOR 2: Textiles and Services
// Based on screenshot: Ивановский текстиль, Шторы, Hair Design, etc.
// ============================================
const floor2: FloorConfig = {
  id: "floor2",
  name: "Этаж 2",
  label: "2",
  stores: [
    // === TOP RIGHT CORNER ===
    {
      id: "f2-printstyle",
      name: "Принт Стайл",
      category: "Печать",
      status: "occupied",
      area: 30,
      color: "#ddd6fe",
      points: "550,40 610,40 640,70 640,100 550,100",
      lx: 590,
      ly: 70,
      fontSize: 8,
    },
    {
      id: "f2-avgusta",
      name: "Августа",
      category: "Одежда",
      status: "occupied",
      area: 35,
      color: "#e5e7eb",
      points: "480,40 545,40 545,90 480,90",
      lx: 510,
      ly: 65,
      fontSize: 10,
    },
    {
      id: "f2-ivanovtextil1",
      name: "Ивановский текстиль",
      category: "Текстиль",
      status: "occupied",
      area: 55,
      color: "#bfdbfe",
      points: "390,40 475,40 475,110 390,110",
      lx: 430,
      ly: 75,
      fontSize: 7,
    },
    {
      id: "f2-lotos",
      name: "Лотос",
      category: "Товары",
      status: "occupied",
      area: 35,
      color: "#e5e7eb",
      points: "590,105 640,105 640,160 590,160",
      lx: 615,
      ly: 132,
      fontSize: 10,
    },
    
    // === SECOND ROW ===
    {
      id: "f2-ivanovtextil2",
      name: "Ивановский текстиль",
      category: "Текстиль",
      status: "occupied",
      area: 50,
      color: "#bfdbfe",
      points: "390,115 475,115 475,170 390,170",
      lx: 430,
      ly: 142,
      fontSize: 7,
    },
    {
      id: "f2-elena",
      name: "Елена",
      category: "Одежда",
      status: "occupied",
      area: 35,
      color: "#e5e7eb",
      points: "530,95 585,95 585,155 530,155",
      lx: 555,
      ly: 125,
      fontSize: 10,
    },
    
    // === THIRD ROW ===
    {
      id: "f2-sletat",
      name: "Слетать.ру",
      category: "Турагентство",
      status: "occupied",
      area: 30,
      color: "#fcd34d",
      points: "390,175 470,175 470,225 390,225",
      lx: 425,
      ly: 200,
      fontSize: 9,
    },
    {
      id: "f2-trikotaj",
      name: "Трикотаж из Турции",
      category: "Одежда",
      status: "occupied",
      area: 50,
      color: "#e5e7eb",
      points: "220,175 320,175 320,235 220,235",
      lx: 265,
      ly: 205,
      fontSize: 7,
    },
    {
      id: "f2-shtory",
      name: "Шторы",
      category: "Текстиль для дома",
      status: "occupied",
      area: 45,
      color: "#e5e7eb",
      points: "475,175 560,175 560,225 475,225",
      lx: 515,
      ly: 200,
      fontSize: 10,
    },
    {
      id: "f2-plan",
      name: "План эвакуации",
      category: "Информация",
      status: "occupied",
      area: 20,
      color: "#f3f4f6",
      points: "565,175 640,175 640,225 565,225",
      lx: 600,
      ly: 200,
      fontSize: 7,
    },
    {
      id: "f2-tropikana",
      name: "Тропикана",
      category: "Товары",
      status: "occupied",
      area: 30,
      color: "#bbf7d0",
      points: "480,95 525,95 525,155 480,155",
      lx: 500,
      ly: 125,
      fontSize: 8,
    },
    
    // === FOURTH ROW ===
    {
      id: "f2-hairdesign",
      name: "Hair Design",
      category: "Салон красоты",
      status: "occupied",
      area: 45,
      color: "#e5e7eb",
      points: "140,190 215,190 215,260 140,260",
      lx: 175,
      ly: 225,
      fontSize: 8,
    },
    {
      id: "f2-sensorufa",
      name: "Sensor-Ufa.ru",
      category: "Электроника",
      status: "occupied",
      area: 35,
      color: "#fecaca",
      points: "325,240 400,240 400,295 325,295",
      lx: 360,
      ly: 268,
      fontSize: 8,
    },
    {
      id: "f2-marmelad",
      name: "Marmelad",
      category: "Сладости",
      status: "occupied",
      area: 40,
      color: "#fed7aa",
      points: "325,300 410,300 410,355 325,355",
      lx: 365,
      ly: 328,
      fontSize: 9,
    },
    {
      id: "f2-mx",
      name: "M&x",
      category: "Одежда",
      status: "occupied",
      area: 35,
      color: "#ddd6fe",
      points: "415,300 490,300 490,355 415,355",
      lx: 450,
      ly: 328,
      fontSize: 10,
    },
    {
      id: "f2-atelie",
      name: "Ателье",
      category: "Пошив и ремонт",
      status: "occupied",
      area: 35,
      color: "#e5e7eb",
      points: "575,230 640,230 640,295 575,295",
      lx: 605,
      ly: 262,
      fontSize: 10,
    },
    
    // === LEFT SIDE ===
    {
      id: "f2-yandexmarket",
      name: "Яндекс Маркет",
      category: "Пункт выдачи",
      status: "occupied",
      area: 55,
      color: "#e5e7eb",
      points: "40,300 135,300 135,370 40,370",
      lx: 85,
      ly: 335,
      fontSize: 7,
    },
    {
      id: "f2-kojgalantereia",
      name: "Кожгалантерея",
      category: "Сумки",
      status: "occupied",
      area: 45,
      color: "#bbf7d0",
      points: "325,360 420,360 420,415 325,415",
      lx: 370,
      ly: 388,
      fontSize: 8,
    },
    {
      id: "f2-belle",
      name: "Bell'ё",
      category: "Белье",
      status: "occupied",
      area: 35,
      color: "#e5e7eb",
      points: "495,300 570,300 570,355 495,355",
      lx: 530,
      ly: 328,
      fontSize: 10,
    },
    {
      id: "f2-rosstrikotaj",
      name: "Российский трикотаж",
      category: "Одежда",
      status: "occupied",
      area: 55,
      color: "#bfdbfe",
      points: "575,300 640,300 640,370 575,370",
      lx: 605,
      ly: 335,
      fontSize: 6,
    },
    
    // === BOTTOM ROW ===
    {
      id: "f2-stirkacom",
      name: "Стирка.com",
      category: "Химчистка",
      status: "occupied",
      area: 35,
      color: "#ddd6fe",
      points: "40,375 130,375 130,420 40,420",
      lx: 85,
      ly: 398,
      fontSize: 8,
    },
    {
      id: "f2-proksima",
      name: "Проксима",
      category: "Товары",
      status: "occupied",
      area: 40,
      color: "#ddd6fe",
      points: "135,375 225,375 225,420 135,420",
      lx: 180,
      ly: 398,
      fontSize: 9,
    },
    {
      id: "f2-ulybkaradugi",
      name: "Улыбка радуги",
      category: "Косметика",
      status: "occupied",
      area: 50,
      color: "#e5e7eb",
      points: "425,360 520,360 520,420 425,420",
      lx: 470,
      ly: 390,
      fontSize: 7,
    },
    {
      id: "f2-design",
      name: "Design",
      category: "Дизайн",
      status: "occupied",
      area: 25,
      color: "#e5e7eb",
      points: "480,425 560,425 590,455 480,455",
      lx: 530,
      ly: 440,
      fontSize: 10,
    },
    
    // Available spaces
    {
      id: "f2-avail1",
      name: "Свободно",
      category: "Торговая площадь",
      status: "available",
      area: 60,
      rent: "от 1000 ₽/м²",
      color: "#bbf7d0",
      points: "220,240 320,240 320,295 220,295",
      lx: 270,
      ly: 268,
      fontSize: 9,
    },
    {
      id: "f2-avail2",
      name: "Свободно",
      category: "Торговая площадь",
      status: "available",
      area: 45,
      rent: "от 950 ₽/м²",
      color: "#bbf7d0",
      points: "230,375 320,375 320,420 230,420",
      lx: 275,
      ly: 398,
      fontSize: 9,
    },
  ],
}

const floors: FloorConfig[] = [floorMinus1, floor1, floor2]

// Building outline path for each floor
function getBuildingPath(floorId: string): string {
  if (floorId === "minus1") {
    // Floor -1: Simpler shape, large Fix Price area
    return "M 35,350 L 35,95 L 95,35 L 545,35 L 585,75 L 585,365 L 515,395 L 35,350"
  }
  // Floor 1 & 2: Fuller building with more stores
  return "M 35,420 L 35,95 L 95,35 L 645,35 L 645,385 L 585,420 L 35,420"
}

// Side Panel Component
function SidePanel({ 
  store, 
  onClose,
  floorLabel
}: { 
  store: Store | null
  onClose: () => void 
  floorLabel: string
}) {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 2000)
  }

  if (!store) return null

  return (
    <AnimatePresence>
      {store && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border p-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{store.name}</h3>
                  <p className="text-sm text-muted-foreground">{store.category}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-6">
                {store.status === "occupied" ? (
                  <div className="space-y-6">
                    <div className="rounded-xl bg-muted p-4">
                      <div 
                        className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl"
                        style={{ backgroundColor: store.color }}
                      />
                      <h4 className="font-semibold text-foreground">О магазине</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {store.name} — арендатор ТСК Перовский в категории &quot;{store.category}&quot;.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-muted p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{store.area}</p>
                        <p className="text-xs text-muted-foreground">м² площадь</p>
                      </div>
                      <div className="rounded-xl bg-muted p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{floorLabel}</p>
                        <p className="text-xs text-muted-foreground">этаж</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border p-4">
                      <p className="text-sm text-muted-foreground">
                        Для связи с магазином обратитесь на стойку информации ТСК.
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-primary">
                        <Phone className="h-4 w-4" />
                        <span className="font-medium">+7 (347) 123-45-67</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-xl bg-green-500/10 p-4">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-600">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                        Свободно для аренды
                      </div>
                      <h4 className="font-semibold text-foreground">Коммерческая площадь</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Отличная локация с высоким пешеходным трафиком.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-muted p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{store.area}</p>
                        <p className="text-xs text-muted-foreground">м² площадь</p>
                      </div>
                      <div className="rounded-xl bg-muted p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">{store.rent}</p>
                        <p className="text-xs text-muted-foreground">стоимость</p>
                      </div>
                    </div>

                    {submitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-xl bg-green-500/10 p-6 text-center"
                      >
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-green-600">Заявка отправлена</h4>
                        <p className="mt-1 text-sm text-muted-foreground">Мы свяжемся с вами в ближайшее время</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <h4 className="font-semibold text-foreground">Оставить заявку</h4>
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ваше имя"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+7 (___) ___-__-__"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Сообщение</Label>
                          <Input
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Дополнительная информация"
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Отправить заявку
                        </Button>
                      </form>
                    )}
                  </div>
                )}
              </ScrollArea>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Main Floor Navigator Component
export function FloorNavigator() {
  const [activeFloor, setActiveFloor] = useState(1)
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [hoveredStore, setHoveredStore] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  const currentFloor = floors[activeFloor]
  
  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 2.5))
  const handleZoomOut = () => setScale((s) => Math.max(s - 0.25, 0.5))
  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as Element).tagName === "svg") {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  // Reset view when floor changes
  useEffect(() => {
    handleReset()
  }, [activeFloor])

  return (
    <section id="floors" className="relative bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Схема торгового центра
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Интерактивная карта всех этажей. Нажмите на магазин для подробной информации или выберите свободную площадь для аренды.
          </p>
        </motion.div>

        {/* Floor Tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-xl bg-background p-1.5 shadow-sm">
            {floors.map((floor, index) => (
              <button
                key={floor.id}
                onClick={() => setActiveFloor(index)}
                className={`relative rounded-lg px-6 py-2.5 text-sm font-medium transition-all ${
                  activeFloor === index
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {floor.name}
              </button>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-lg">
            {/* Controls */}
            <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
              <Button variant="secondary" size="icon" onClick={handleZoomIn} className="shadow-md">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" onClick={handleZoomOut} className="shadow-md">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="icon" onClick={handleReset} className="shadow-md">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute left-4 top-4 z-10 rounded-lg bg-background/95 p-3 shadow-md backdrop-blur-sm">
              <p className="mb-2 text-xs font-medium text-foreground">Легенда</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-[#bbf7d0]" />
                  <span className="text-xs text-muted-foreground">Свободно</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-[#bfdbfe]" />
                  <span className="text-xs text-muted-foreground">Продукты</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-[#fed7aa]" />
                  <span className="text-xs text-muted-foreground">Выпечка</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm bg-[#e5e7eb]" />
                  <span className="text-xs text-muted-foreground">Услуги</span>
                </div>
              </div>
            </div>

            {/* SVG Map */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFloor.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <svg
                  ref={svgRef}
                  viewBox="0 0 700 480"
                  className="h-auto w-full"
                  style={{
                    transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                    transformOrigin: "center",
                    transition: isDragging ? "none" : "transform 0.1s ease-out",
                  }}
                >
                  {/* Background */}
                  <rect x="0" y="0" width="700" height="480" fill="#f8fafc" />
                  
                  {/* Road / Parking area indicator */}
                  <path
                    d="M 0,420 L 30,350 L 30,90 L 0,30 L 0,420"
                    fill="#94a3b8"
                    opacity="0.3"
                  />
                  
                  {/* Building outline */}
                  <path
                    d={getBuildingPath(currentFloor.id)}
                    fill="#f1f5f9"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                  />

                  {/* Stores */}
                  {currentFloor.stores.map((store) => (
                    <g key={store.id}>
                      <polygon
                        points={store.points}
                        fill={store.color}
                        stroke={
                          hoveredStore === store.id
                            ? "#ef4444"
                            : store.status === "available"
                            ? "#22c55e"
                            : "#94a3b8"
                        }
                        strokeWidth={hoveredStore === store.id ? 2.5 : 1}
                        className="cursor-pointer transition-all duration-150"
                        style={{
                          filter: hoveredStore === store.id ? "brightness(1.05)" : "none",
                        }}
                        onMouseEnter={() => setHoveredStore(store.id)}
                        onMouseLeave={() => setHoveredStore(null)}
                        onClick={() => setSelectedStore(store)}
                      />
                      {/* Store label */}
                      <text
                        x={store.lx}
                        y={store.ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#1e293b"
                        fontSize={store.fontSize || 10}
                        fontWeight="500"
                        className="pointer-events-none select-none"
                      >
                        {store.name}
                      </text>
                      {/* Available indicator */}
                      {store.status === "available" && (
                        <text
                          x={store.lx}
                          y={store.ly + 12}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#16a34a"
                          fontSize="7"
                          fontWeight="600"
                          className="pointer-events-none select-none"
                        >
                          {store.area} м²
                        </text>
                      )}
                    </g>
                  ))}

                  {/* Entrance arrows */}
                  <g className="pointer-events-none">
                    {/* Arrow 1 */}
                    <polygon points="15,290 25,285 25,295" fill="#ef4444" />
                    <circle cx="10" cy="290" r="3" fill="#ef4444" />
                    {/* Arrow 2 */}
                    <polygon points="15,350 25,345 25,355" fill="#ef4444" />
                    <circle cx="10" cy="350" r="3" fill="#ef4444" />
                  </g>

                  {/* Parking icon */}
                  <g className="pointer-events-none">
                    <rect x="5" y="380" width="18" height="18" rx="2" fill="#3b82f6" />
                    <text x="14" y="393" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">P</text>
                  </g>

                  {/* Floor indicator */}
                  <text
                    x="650"
                    y="460"
                    textAnchor="end"
                    fill="#94a3b8"
                    fontSize="14"
                    fontWeight="600"
                  >
                    {currentFloor.name}
                  </text>
                </svg>
              </motion.div>
            </AnimatePresence>

            {/* Tooltip */}
            {hoveredStore && (
              <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-foreground px-3 py-1.5 text-sm text-background shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {currentFloor.stores.find((s) => s.id === hoveredStore)?.name}
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-background p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-primary">
                {currentFloor.stores.filter((s) => s.status === "occupied").length}
              </p>
              <p className="text-sm text-muted-foreground">Магазинов</p>
            </div>
            <div className="rounded-xl bg-background p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-green-600">
                {currentFloor.stores.filter((s) => s.status === "available").length}
              </p>
              <p className="text-sm text-muted-foreground">Свободно</p>
            </div>
            <div className="rounded-xl bg-background p-4 text-center shadow-sm">
              <p className="text-2xl font-bold text-foreground">
                {currentFloor.stores.reduce((acc, s) => acc + (s.area || 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">м² всего</p>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <SidePanel
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
        floorLabel={currentFloor.label}
      />
    </section>
  )
}
