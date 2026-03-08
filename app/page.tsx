import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FloorNavigator } from "@/components/floor-navigator"
import { About } from "@/components/about"
import { Lease } from "@/components/lease"
import { Contacts } from "@/components/contacts"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FloorNavigator />
      <About />
      <Lease />
      <Contacts />
      <Footer />
    </main>
  )
}
