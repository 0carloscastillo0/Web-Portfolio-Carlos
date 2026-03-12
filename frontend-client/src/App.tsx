import { useEffect } from "react"
import { Routes, Route, Navigate, useParams } from "react-router-dom"

import Header from "./layouts/Header"
import Footer from "./layouts/Footer"

import Home from "./sections/Home"
import About from "./sections/About"
import Projects from "./sections/Projects"

import { PortfolioProvider } from "./contexts/PortfolioProvider"

function PortfolioPage() {
  const { section } = useParams()

  useEffect(() => {

    if (!section) return

    const element = document.getElementById(section)

    if (element) {
      element.scrollIntoView({
        behavior: "auto",
        block: "start"
      })
    }

  }, [])

  return (
    <>
      <Home />
      <About />
      <Projects />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-primary text-text transition-colors duration-300">

      <Header />

      <main className="flex-1 px-6 lg:px-12">

        <PortfolioProvider>
          <Routes>
            
            <Route path="/" element={<Navigate to="/en/home" replace />} />

            <Route path="/:lang/:section" element={<PortfolioPage />} />

            <Route path="/:lang" element={<PortfolioPage />} />

          </Routes>
        </PortfolioProvider>

      </main>

      <Footer />

    </div>
  )
}

export default App