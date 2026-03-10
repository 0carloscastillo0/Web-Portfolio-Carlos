import { useEffect } from "react"
import { Routes, Route, Navigate, useParams } from "react-router-dom"

import Header from "./layouts/Header"
import Footer from "./layouts/Footer"

import Home from "./sections/Home"
import About from "./sections/About"
import Projects from "./sections/Projects"

function RouteScrollHandler(){

  const { section } = useParams()

  useEffect(() => {

    if (!section) return
    
    const element = document.getElementById(section.toLowerCase())
    if (element){
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "auto"
        })
      }, 50)
    }

  }, [section])

  return null

}

function PortfolioPage() {
  return (
    <>
      <RouteScrollHandler />

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

      <main className="flex-1">

        <Routes>
          
          <Route path="/" element={<Navigate to="/en/home" replace />} />

          <Route path="/:lang/:section" element={<PortfolioPage />} />

          <Route path="/:lang" element={<PortfolioPage />} />

        </Routes>

      </main>

      <Footer />

    </div>
  )
}

export default App