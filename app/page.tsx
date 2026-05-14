import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Stats from '@/components/Stats'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import StatueBackgroundClient from '@/components/StatueBackgroundClient'

export default function Home() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      <StatueBackgroundClient />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Stats />
      <Contact />
      <Footer />
    </main>
  )
}
